import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

export default function details() {
  const {
    Name,
    CookTime,
    Calories,
    SaturatedFatContent,
    CholesterolContent,
    SodiumContent,
    CarbohydrateContent,
    FiberContent,
    SugarContent,
    ProteinContent,
    RecipeInstructions,
    RecipeIngredientParts,
  } = useLocalSearchParams();
  useEffect(() => {
    console.log("data", Name);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{Name}</Text>
        <Text style={styles.details}>
           <Text>•</Text> Cook Time: {CookTime}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Calories: {Calories}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Saturated Fat Content: {SaturatedFatContent}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Cholesterol Content: {CholesterolContent}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Sodium Content: {SodiumContent}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Carbohydrate Content: {CarbohydrateContent}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Fiber Content: {FiberContent}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Sugar Content: {SugarContent}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Protein Content: {ProteinContent}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Recipe Instructions: {RecipeInstructions}
        </Text>
        <Text style={styles.details}>
           <Text>•</Text> Recipe Ingredient Parts: {RecipeIngredientParts}
        </Text>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgay",
  },
  box: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: "#000",
    padding: 10,
  }
});
