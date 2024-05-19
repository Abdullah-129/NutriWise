export default GenderSelection = ({ selectedValue, onValueChange }) => {
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