import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import PasswordRecovery from '../pages/passwordRecovery';
// import {Home} from '../pages/home';
import {useFonts, SairaStencilOne_400Regular,
} from '@expo-google-fonts/dev';
import MyTab from '../components/BottomTab';
import AppLoading from 'expo-app-loading';
import EmployeeRegister from '../pages/EmployeeRegister';
import ItemList from '../pages/itemList';
import Home from '../pages/home';
import ItemDetails from '../pages/itemDetails';
import CloseOrder from '../pages/closeOrder';
import CategoryRegister from '../pages/categoryRegister';
import JobRegister from '../pages/JobRegister';
import Employee from '../pages/employee';
import IngredientRegister from '../pages/ingredientRegister';
import ItemRegister from '../pages/itemRegister';
const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  let [fontsLoaded] = useFonts({
    SairaStencilOne_400Regular
  });

  if (!fontsLoaded) {
    <AppLoading/>
  } else {
    return (

      <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
        <Screen name="Login" component={Login} />
        {/* <Screen name="Home" component={Home} /> */}
        <Screen name="EmployeeRegister" component={EmployeeRegister} />
        <Screen name="Employee" component={Employee} />
        <Screen name="PasswordRecovery" component={PasswordRecovery} />
        <Screen name="BottomTab" component={MyTab} />
        <Screen name="ItemList" component={ItemList} />
        <Screen name="ItemDetails" component={ItemDetails} />
        <Screen name="CategoryRegister" component={CategoryRegister} />
        <Screen name="CloseOrder" component={CloseOrder} />
        <Screen name="JobRegister" component={JobRegister} />
        <Screen name="IngredientRegister" component={IngredientRegister} />
        <Screen name="ItemRegister" component={ItemRegister} />
      </Navigator>

    );
  }
}

export default AppStack;