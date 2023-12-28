import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DetectObject = () => {
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);

  const pickImage = async () => {
    try {
      const options = {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 300,
        maxWidth: 300,
      };

      launchImageLibrary(options, (response) => {
        if (!response.didCancel) {
          setImageUri(response.assets[0]?.uri);
        }
      });
    } catch (error) {
      console.error('Error Picking Image:', error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        alert('Please select an image first!!');
        return;
      }

      const apiKey = 'AIzaSyBppuYdjUjoGopkko042rw2lO4x9wxCaBQ';
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const base64ImageData = await RNFS.readFile(imageUri, 'base64');
      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData);

      // Extracting labels from the response
      const labels = apiResponse.data.responses[0]?.labelAnnotations || [];
      setLabels(labels);
    } catch (error) {
      console.error('Error Analyzing Image:', error);
      alert('Error Analyzing Image. Please try again later');
    }
  };

  const backToDashboard = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Cloud Vision</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 300 }}
        />
      )}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.text}>Choose an image..</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.text}>Analyze image..</Text>
      </TouchableOpacity>
      {labels.length > 0 && (
        <View>
          <Text style={styles.label}>Labels:</Text>
          {labels.map((label) => (
            <Text key={label.mid} style={styles.outputtext}>
              {label.description}
            </Text>
          ))}
        </View>
      )}
      <TouchableOpacity onPress={backToDashboard} style={styles.button}>
        <Text style={styles.text}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    marginTop: 50,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  outputtext: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetectObject;
