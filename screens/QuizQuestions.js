import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const QuizQuestions = ({ route }) => {
  const { subcategory } = route.params;
  const questions = subcategory.questions || [];

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState(Array(questions.length).fill(null));

  const navigation = useNavigation(); // Get navigation object

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    const newSelectedAnswerIndices = [...selectedAnswerIndices];
    newSelectedAnswerIndices[questionIndex] = optionIndex;
    setSelectedAnswerIndices(newSelectedAnswerIndices);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleSubmit = () => {
    // Perform actions when the quiz is submitted, e.g., calculate score
    // You can add your logic here
  };

  const renderQuestion = (item, questionIndex) => (
    <View key={questionIndex} style={styles.questionContainer}>
      <Text style={styles.questionText}>{`${questionIndex + 1}. ${item.question}`}</Text>
      {item.options.map((option, optionIndex) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => handleAnswerSelection(questionIndex, optionIndex)}
          style={[
            styles.optionContainer,
            selectedAnswerIndices[questionIndex] === optionIndex && option.isCorrect
              ? styles.correctOption
              : selectedAnswerIndices[questionIndex] === optionIndex
              ? styles.incorrectOption
              : null,
          ]}
        >
          <Text style={styles.optionText}>{`${String.fromCharCode(65 + optionIndex)}. ${option.answer}`}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.navigationButtons}>
        {currentQuestionIndex === 0 ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <Button title="Previous" onPress={handlePrevious} />
        )}
        {currentQuestionIndex === questions.length - 1 ? (
          <Button title="Submit" onPress={handleSubmit} />
        ) : (
          <Button title="Next" onPress={handleNext} />
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {!quizStarted && (
        <View style={styles.startButtonContainer}>
          <Text style={styles.introText}>Welcome to the Quiz!</Text>
          <Text style={styles.introText}>Test your knowledge by clicking below:</Text>
          <Button title="Let's Play" onPress={handleStartQuiz} />
        </View>
      )}
      {quizStarted && (
        <View>
          <Text style={styles.heading}>Quiz Questions for {subcategory.name}</Text>
          {renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  startButtonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  introText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  questionContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 8,
  },
  optionContainer: {
    backgroundColor: '#95a5a6',
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  backButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default QuizQuestions;
