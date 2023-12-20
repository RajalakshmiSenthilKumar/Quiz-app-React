// AppNavigator.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import QuizQuestions from './screens/QuizQuestions';
import Splash from './screens/Splash'; // Update the path
import userStore from './store/UserStore';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
