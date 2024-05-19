import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GenderSelection = ({ selectedValue, onValueChange }) => {
  const genders = ["Male", "Female"];

  return (
    <View style={styles.genderContainer}>
      {genders.map((gender, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.genderButton,
            selectedValue === gender && styles.selectedGender,
          ]}
          onPress={() => onValueChange(gender)}
        >
          <Text style={styles.genderText}>{gender}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Exerciseselection = ({ selectedValue, onValueChange }) => {
  const exercise = ["Not Active", "Active", "Very Active", "Extremely Active"];

  return (
    <View style={styles.genderContainer}>
      {exercise.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.genderButton,
            selectedValue === exercise && styles.selectedGender,
          ]}
          onPress={() => onValueChange(exercise)}
        >
          <Text style={styles.genderText}>{exercise}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const TabTwoScreen = () => {
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("Male");
  const [exercise, setExercise] = useState("Not Active");
  const [activity, setActivity] = useState("Little/no exercise");
  const [weightLossOption, setWeightLossOption] = useState("Maintain weight");
  const [generated, setGenerated] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [person, setPerson] = useState(null);
  const [dietplan, setDietplan] = useState(null);
  const [feilds, setFields] = useState(true);

  const genratediet = async (nutritionInput) => {
    const request = {
      nutrition_input: nutritionInput,
      ingredients: [],
      params: { n_neighbors: 5, return_distance: false },
    };

    try {
      const response = await fetch("http://0.0.0.0:8080/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();

      // console.log(data.output);
      setRecommendations(data.output);
      let datachannged = data.output;
      console.log("Diet Plan",datachannged);
      setDietplan(datachannged);
      return data;
    } catch (error) {
      console.error("Error generating diet recommendations:", error);
      return null;
    }
  };

  const plans = [
    "Maintain weight",
    "Mild weight loss",
    "Weight loss",
    "Extreme weight loss",
  ];
  const weights = [1, 0.9, 0.8, 0.6];
  const losses = ["-0 kg/week", "-0.25 kg/week", "-0.5 kg/week", "-1 kg/week"];

  const calculateBMI = (weight, height) => {
    const bmi = (weight / (height / 100) ** 2).toFixed(2);
    return bmi;
  };

  const displayResult = (weight, height) => {
    const bmi = calculateBMI(weight, height);
    let category, colordiet;

    if (bmi < 18.5) {
      category = "Underweight";
      colordiet = "Red";
    } else if (bmi < 25) {
      category = "Normal";
      colordiet = "Green";
    } else if (bmi < 30) {
      category = "Overweight";
      colordiet = "Yellow";
    } else {
      category = "Obesity";
      colordiet = "Red";
    }

    return { bmi: `${bmi} kg/m²`, category, colordiet };
  };

  const calculateBMR = (weight, height, age, gender) => {
    const genderFactor = gender === "Male" ? 5 : -161;
    const bmr = 10 * weight + 6.25 * height - 5 * age + genderFactor;
    return bmr;
  };

  const caloriesCalculator = (weight, height, age, gender, activity) => {
    const activities = [
      "Little/no exercise",
      "Light exercise",
      "Moderate exercise (3-5 days/wk)",
      "Very active (6-7 days/wk)",
      "Extra active (very active & physical job)",
    ];
    const weights = [1.2, 1.375, 1.55, 1.725, 1.9];
    const weightIndex = activities.indexOf(activity);
    const weightFactor = weights[weightIndex];
    const bmr = calculateBMR(weight, height, age, gender);
    const calories = bmr * weightFactor;
    return calories;
  };

  const generateRecommendations = (
    weightLoss,
    caloriesCalculator,
    mealsCaloriesPerc
  ) => {
    const totalCalories = weightLoss * caloriesCalculator;
    const recommendations = [];

    // Generate recommendations based on mealsCaloriesPerc
    // Placeholder logic, replace with actual logic
    for (const meal in mealsCaloriesPerc) {
      const mealCalories = mealsCaloriesPerc[meal] * totalCalories;
      const recommendedNutrition = [mealCalories, 0, 0, 0, 0, 0, 0, 0, 0]; // Placeholder for recommended nutrition
      const recommendedRecipes = [];
      recommendations.push(recommendedRecipes);
    }

    return recommendations;
  };

  const displayBMI = () => {
    const { bmi, category, colordiet } = displayResult(weight, height);

    return (
      <ScrollView
        style={{
          backgroundColor: "white",
          margin: 10,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "lightgrey",
          marginBottom: 10,

        }}
      >
        <Text
          style={{
            color: "green",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          BMI CALCULATOR
        </Text>
        <Text>
          Body Mass Index (BMI):{" "}
          <Text
            style={{
              color: "green",
            }}
          >
            {bmi}
          </Text>
        </Text>
        <Text style={{}}>
          Your body Type is:{" "}
          <Text
            style={{
              color: "green",
            }}
          >
            {category}
          </Text>{" "}
        </Text>
      </ScrollView>
    );
  };

  const displayCalories = () => {
    const maintainCalories = caloriesCalculator(
      weight,
      height,
      age,
      gender,
      activity
    );

    return (
      <ScrollView>
        <Text>
          The results show a number of daily calorie estimates that can be used
          as a guideline for how many calories to consume each day to maintain,
          lose, or gain weight at a chosen rate.
        </Text>
        {plans.map((plan, index) => (
          <View
            style={{
              backgroundColor: "white",
              margin: 5,
              padding: 10,
              borderColor: "lightgrey",
            }}
            key={index}
          >
            <Text>
              {plan}: {Math.round(maintainCalories * weights[index])}{" "}
              Calories/day ({losses[index]})
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const handleSubmit = async () => {
    const weightLoss = weights[plans.indexOf(weightLossOption)];
    const mealsCaloriesPerc = { breakfast: 0.35, lunch: 0.4, dinner: 0.25 };
    const person = {
      age,
      height,
      weight,
      gender,
      activity,
      mealsCaloriesPerc,
      weightLoss,
    };
    const recommendations = await generateRecommendations(
      weightLoss,
      caloriesCalculator(weight, height, age, gender, activity),
      mealsCaloriesPerc
    );
    setPerson(person);
    const bmi = calculateBMI(weight, height);

    let newt = [];

    if (bmi < 18.5) {
      if (exercise === "Not Active") {
        newt = [2800, 130, 90, 350, 1800, 200, 35, 50, 120];
      } else if (exercise === "Active") {
        newt = [2900, 140, 95, 370, 1900, 220, 37, 55, 125];
      } else if (exercise === "Very Active") {
        newt = [3000, 150, 100, 400, 2000, 250, 40, 60, 130];
      }
    } else if (bmi >= 18.5 && bmi < 25) {
      if (exercise === "Not Active") {
        newt = [2500, 120, 80, 320, 1600, 180, 30, 45, 100];
      } else if (exercise === "Active") {
        newt = [2700, 130, 85, 340, 1700, 200, 32, 50, 110];
      } else if (exercise === "Very Active") {
        newt = [2900, 140, 90, 360, 1800, 220, 35, 55, 120];
      }
    } else if (bmi >= 25) {
      if (exercise === "Not Active") {
        newt = [2000, 100, 70, 280, 1400, 150, 25, 40, 80];
      } else if (exercise === "Active") {
        newt = [2200, 110, 75, 300, 1500, 170, 27, 45, 90];
      } else if (exercise === "Very Active") {
        newt = [2400, 120, 80, 320, 1600, 190, 30, 50, 100];
      }
    }
    const diet = genratediet(newt);
    // setRecommendations(diet);
    // console.log("r", dietplan);
    setGenerated(true);
    // setDietplan(diet);
    setFields(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {feilds && (
        <>
          <Text style={styles.title}>Automatic Diet Recommendation</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={(text) => setAge(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={(text) => setHeight(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => setWeight(text)}
          />
          <Text style={styles.genderText}>Select Your Gender</Text>
          <GenderSelection selectedValue={gender} onValueChange={setGender} />
          <View>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Select Your Daily Exercise
            </Text>
            <Exerciseselection
              selectedValue={exercise}
              onValueChange={setExercise}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Generate Diet</Text>
          </TouchableOpacity>
        </>
      )}

      {generated && (
        <View style={styles.resultContainer}>
          {displayBMI()}
          {displayCalories()}
          <Text
            style={{
              color: "green",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
              margintop: 10,
              textAlign: "center",
            }}
          >
            Diet Recommendations:
          </Text>
          <View>
            {dietplan !== null ? (
              dietplan.map((rec, index) => (
                <View
                  style={{
                    backgroundColor: "white",
                    margin: 5,
                    padding: 10,
                    borderColor: "lightgrey",
                    borderRadius: 10,
                  }}
                  key={index}
                >
                  <Pressable
                    onPress={() => {
                      router.push({
                        pathname: "/Details/[data]",
                        params: {
                          Name: rec.Name,
                          Calories: rec.Calories,
                          CookTime: rec.CookTime,
                          FatContent: rec.FatContent,
                          SaturatedFatContent: rec.SaturatedFatContent,
                          CholesterolContent: rec.CholesterolContent,
                          SodiumContent: rec.SodiumContent,
                          CarbohydrateContent: rec.CarbohydrateContent,
                          FiberContent: rec.FiberContent,
                          SugarContent: rec.SugarContent,
                          ProteinContent: rec.ProteinContent,
                          RecipeInstructions: rec.RecipeInstructions,
                          RecipeIngredientParts: rec.RecipeIngredientParts,
                        },
                      });
                    }}
                  >
                    <Text>
                      {rec.Name}: {rec.Calories} Calories
                    </Text>
                  </Pressable>
                </View>
              ))
            ) : (
              <Text
                style={{
                  color: "red",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  marginTop: 10,
                  textAlign: "center",
                }}
              >
                No Recommendations
              </Text>
            )}
            <TouchableOpacity style={styles.button} onPress={()=> {setFields(true); setGenerated(false);}}>
              <Text style={styles.buttonText}>
                Regenerate Diet
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
    </ScrollView>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "green",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  genderButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedGender: {
    borderColor: "green",
    backgroundColor: "#e0f7fa",
  },
  genderText: {
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
