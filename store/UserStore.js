// UserStore.js
import { observable, action, makeObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
  @observable isFirstTimeUser = true;

  constructor() {
    makeObservable(this);
  }

  @action checkFirstTimeUser = async () => {
    try {
      const value = await AsyncStorage.getItem('IS_FIRST_TIME_USER');
      if (value !== null) {
        this.isFirstTimeUser = JSON.parse(value);
      }
    } catch (error) {
      console.error('Error checking first-time user:', error);
    }
  };

  @action updateFirstTimeUser = async () => {
    try {
      this.isFirstTimeUser = false;
      await AsyncStorage.setItem('IS_FIRST_TIME_USER', JSON.stringify(false));
    } catch (error) {
      console.error('Error updating first-time user:', error);
    }
  };
}

const userStore = new UserStore();
export default userStore;
