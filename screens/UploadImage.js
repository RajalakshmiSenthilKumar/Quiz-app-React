import React from 'react';
import { View, Text, TouchableOpacity, CameraRoll, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import tree from '../screens/GalleryImage/tree.jpg';
import taj from '../screens/GalleryImage/taj.jpg';

const SaveImagesToGallery = () => {
  const saveImagesToGallery = async () => {
    try {
      // Request permission for Android
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          alert('Permission denied. Cannot save images.');
          return;
        }
      }

      const images = [tree, taj];

      for (const image of images) {
        // Ensure the image is in a local file URI format
        const localFilePath = RNFS.TemporaryDirectoryPath + '/' + image.split('/').pop();

        // Download the image to the temporary directory
        const response = await RNFS.downloadFile({
          fromUrl: image,
          toFile: localFilePath,
        }).promise;

        if (response.statusCode === 200) {
          // Save the image to the photo gallery
          await CameraRoll.saveToCameraRoll(localFilePath, 'photo');
        } else {
          console.warn(`Failed to download the image: ${image}`);
        }
      }

      alert('Images saved to gallery!');
    } catch (error) {
      console.error('Error saving images:', error);
      alert('Error saving images. Please try again.');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={saveImagesToGallery}>
        <Text>Save Images to Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SaveImagesToGallery;
