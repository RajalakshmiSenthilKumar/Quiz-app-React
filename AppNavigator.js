// AppNavigator.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import QuizQuestions from './screens/QuizQuestions';
import Splash from './screens/Splash'; 
import userStore from './store/UserStore';
import GoogleVision from './screens/GoogleVision';
import UploadImage from './screens/UploadImage';
import Scan from './screens/Scan';
import Flatlist from './screens/Flatlist';

const Stack = createStackNavigator();

const AppNavigator = () => {
  useEffect(() => {
    const checkFirstTimeUser = async () => {
      await userStore.checkFirstTimeUser();

      // If it's the first time, update isFirstTimeUser and navigate to HomeScreen
      if (userStore.isFirstTimeUser) {
        await userStore.updateFirstTimeUser();
      }
    };

    checkFirstTimeUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userStore.isFirstTimeUser ? "Home" : "Dashboard"}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="QuizQuestions" component={QuizQuestions} options={{ headerShown: false }} />
        <Stack.Screen name="GoogleVision" component={GoogleVision} options={{ headerShown: false }} />
        <Stack.Screen name="UploadImage" component={UploadImage} options={{ headerShown: false }} />
        <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />
        <Stack.Screen name="Flatlist" component={Flatlist} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
