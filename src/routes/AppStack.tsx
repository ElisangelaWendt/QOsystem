import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import PasswordRecovery from '../pages/passwordRecovery';
// import {Home} from '../pages/home';
import {useFonts, SairaStencilOne_400Regular,
} from '@expo-google-fonts/dev';
import FoodList from '../pages/foodList';
import MyTab from '../components/BottomTab';
import Home from '../pages/home';
import AppLoading from 'expo-app-loading';
import EmployeeRegister from '../pages/employee/EmployeeRegister';
const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  let [fontsLoaded] = useFonts({
    SairaStencilOne_400Regular
  });

  if (!fontsLoaded) {
    <AppLoading/>
  } else {
    return (

      <Navigator initialRouteName="Login" screenOptions={{ headerShown: false, cardStyle: {  }, }} >
        <Screen name="Login" component={Login} />
        <Screen name="Home" component={Home} />
        <Screen name="EmployeeRegister" component={EmployeeRegister} />
        <Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Screen name="BottomTab" component={MyTab} />
        <Screen name="FoodList" component={FoodList} />
      </Navigator>

    );
  }
}

export default AppStack;