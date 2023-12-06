// App.js
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './AppNavigator';

class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return <AppNavigator />;
  }
}

export default App;
