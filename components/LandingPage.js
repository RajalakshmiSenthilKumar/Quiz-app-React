import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Dashboard from "../screens/Dashboard";

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  let swiperRef;

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      swiperRef.scrollBy(1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      swiperRef.scrollBy(-1);
    }
  };

  const handleSkip = () => {
    // Update the state to show the Dashboard
    setShowDashboard(true);
  };

  const data = [
    {
      id: 1,
      title: 'Welcome to Quiz App',
      description: 'Learn and test your knowledge with fun quizzes!',
    },
    {
      id: 2,
      title: 'Challenges and Rewards',
      description: 'Take challenges, earn rewards, and track your progress.',
    },
    {
      id: 3,
      title: 'Ready to Start?',
      description: 'Begin your quiz journey now! Tap "Skip" to explore later.',
    },
  ];

  const renderSlides = () => {
    return data.map((item) => (
      <View key={item.id} style={styles.slide}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {showDashboard ? (
        <Dashboard />
      ) : (
        <>
          <Swiper
            ref={(ref) => (swiperRef = ref)}
            loop={false}
            onIndexChanged={(index) => setCurrentIndex(index)}
          >
            {renderSlides()}
          </Swiper>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlePrevious} style={styles.button}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip} style={styles.button}>
              <Text>Skip</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  slideDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
});

export default LandingPage;
