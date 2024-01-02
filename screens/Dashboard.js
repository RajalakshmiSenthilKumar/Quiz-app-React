import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import categoriesData from '../data/categories.json';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    if (screenName === 'Scanner') {
      navigation.navigate('Scan');
    } else if (screenName === 'Flatlist') {
      navigation.navigate('Flatlist'); // Make sure 'FlatlistScreen' is correctly defined in your navigator
    } else {
      navigation.navigate(screenName);
    }
  };
  

  const handleCategoryPress = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    setSelectedSubcategory(null);
  };

  const handleSubcategoryPress = (subcategory) => {
    setSelectedSubcategory(subcategory);
    navigation.navigate('QuizQuestions', { subcategory });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quiz Categories</Text>
      <ScrollView style={styles.categoryContainer}>
        {categoriesData.map((category, index) => (
          <View key={index}>
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
            {selectedCategory === category &&
              category.subcategories.map((subcategory, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  style={[
                    styles.subcategoryItem,
                    selectedSubcategory === subcategory && styles.selectedSubcategory,
                  ]}
                  onPress={() => handleSubcategoryPress(subcategory)}
                >
                  <Text style={styles.subcategoryText}>{subcategory.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>

      {/* Separate Button for Google Vision */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress('GoogleVision')}
      >
        <Text style={styles.buttonText}>Google Vision</Text>
      </TouchableOpacity>

      {/* Separate Button for Scanner */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress('Scanner')}
      >
        <Text style={styles.buttonText}>Voice Recognition</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.button}
  onPress={() => handleButtonPress('Flatlist')}
>
  <Text style={styles.buttonText}>Flatlist</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2c3e50', // Dark Gray
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#3498db',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2, // Shadow
  },
  selectedCategory: {
    backgroundColor: '#2980b9',
  },
  categoryText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  subcategoryItem: {
    backgroundColor: '#5DADE2',
    padding: 12,
    marginBottom: 4,
    borderRadius: 4,
    elevation: 2,
  },
  selectedSubcategory: {
    backgroundColor: '#4DAF7C',
  },
  subcategoryText: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#2ecc71', 
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Dashboard;
