import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';

const QuizQuestions = ({ route }) => {
  const { subcategory } = route.params;
  const questions = subcategory.questions || [];

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndices, setSelectedAnswerIndices] = useState(Array(questions.length).fill(null));

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
          <View style={styles.navigationButtons}>
            <Button title="Previous" onPress={handlePrevious} disabled={currentQuestionIndex === 0} />
            <Button title="Next" onPress={handleNext} disabled={currentQuestionIndex === questions.length - 1} />
          </View>
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
    paddingHorizontal: 16, // Added padding for better spacing
  },
});

export default QuizQuestions;
