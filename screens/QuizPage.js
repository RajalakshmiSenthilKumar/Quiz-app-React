// QuizPage.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const QuizPage = ({ route }) => {
  const { selectedCategory, selectedSubcategory } = route.params;

  const renderQuizSection = () => {
    if (selectedCategory && selectedSubcategory) {
      const selectedSubcategoryObj = selectedCategory.subcategories.find(
        (subcat) => subcat.name === selectedSubcategory.name
      );

      if (selectedSubcategoryObj) {
        const filteredQuestions = selectedSubcategoryObj.questions;

        return (
          <ScrollView style={styles.quizContainer}>
            <Text style={styles.quizHeading}>Quiz Questions for {selectedSubcategory.name}</Text>
            {filteredQuestions.map((question, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.question}</Text>
                <View style={styles.optionsContainer}>
                  {question.options.map((option, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      style={styles.optionItem}
                      onPress={() => handleOptionPress(option)}
                    >
                      <Text style={styles.optionText}>{option.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.playButton} onPress={() => handlePlayButtonPress()}>
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      }
    }
    return null;
  };

  const handleOptionPress = (option) => {
    console.log(`Selected option: ${option.text}`);
  };

  const handlePlayButtonPress = () => {
    console.log('Start the quiz!');
  };

  return (
    <View style={styles.container}>
      {renderQuizSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  quizContainer: {
    marginTop: 16,
  },
  quizHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionItem: {
    backgroundColor: '#95a5a6',
    padding: 12,
    borderRadius: 4,
    width: '48%',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#27ae60',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  playButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default QuizPage;
