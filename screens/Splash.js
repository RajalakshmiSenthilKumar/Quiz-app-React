// Splash.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import userStore from './store/UserStore'; 
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const redirectToScreen = async () => {
      await userStore.checkFirstTimeUser();

      if (userStore.isFirstTimeUser) {
       
        await userStore.updateFirstTimeUser();
        navigation.navigate('Home');
      } else {
       
        navigation.navigate('Dashboard');
      }
    };

    redirectToScreen();
  }, []);

  return (
    <View>
      <Text>Splash Screen</Text>
     
    </View>
  );
};

export default observer(Splash);
