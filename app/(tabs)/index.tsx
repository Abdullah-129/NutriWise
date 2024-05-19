import { Image, StyleSheet, Platform, ScrollView, Text, TouchableOpacity, View } from'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/bg-photo.jpeg')}
          style={styles.reactLogo}
        />
      }>
      <ScrollView style={styles.container}>
      <Text style={styles.header}>About Us</Text>
      <Text style={styles.text}>
        Welcome to <Text style={styles.bold}>DietMaster</Text>, your personal nutrition assistant designed to help you achieve your health and fitness goals. At DietMaster, we believe that everyone deserves a diet plan tailored specifically to their unique needs and lifestyle. That's why we've harnessed the power of machine learning to create personalized diet plans just for you.
      </Text>

      <Text style={styles.subHeader}>How It Works</Text>
      <Text style={styles.text}>
        DietMaster uses cutting-edge machine learning algorithms to generate diet plans based on your personal details such as height, weight, age, activity level, and dietary preferences. By analyzing this information, our app crafts a balanced and nutritious meal plan that aligns with your specific health objectives, whether it's weight loss, muscle gain, or simply maintaining a healthy lifestyle.
      </Text>

      <Text style={styles.subHeader}>Key Features</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>Personalized Plans</Text>: Enter your details, and let our advanced algorithms do the rest. Receive a diet plan that is tailored to your unique body and goals.</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>Flexible Options</Text>: Adjust your preferences at any time. Whether you have dietary restrictions, specific nutrition goals, or just want to try something new, DietMaster adapts to fit your needs.</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>Expert Insights</Text>: Our app is built on the latest nutritional science, ensuring that your meal plan is not only personalized but also grounded in expert knowledge.</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>User-Friendly Interface</Text>: Navigate easily through our intuitive design, making it simple to track your progress and make adjustments as needed.</Text>
      <Text style={styles.listItem}>• <Text style={styles.bold}>Continuous Learning</Text>: The more you use DietMaster, the smarter it gets. Our machine learning algorithms continuously refine your diet plan based on your feedback and progress.</Text>

      <Text style={styles.subHeader}>Our Mission</Text>
      <Text style={styles.text}>
        At DietMaster, our mission is to empower you with the tools and knowledge you need to lead a healthier, happier life. We are committed to providing you with a diet plan that is as unique as you are, helping you make informed choices that support your long-term health and well-being.
      </Text>

      <Text style={styles.subHeader}>Get Started</Text>
      <Text style={styles.text}>
        Join the DietMaster community today and take the first step towards a healthier you. Download our app, enter your details, and start your journey to optimal nutrition and fitness with a diet plan that truly fits.
      </Text>
    </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    bottom: 0,
    left: 0,
    objectFit: 'contain',
  },  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});
