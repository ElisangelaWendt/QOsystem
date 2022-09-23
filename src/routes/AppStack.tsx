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
import CompleteOrder from '../pages/CompleteOrder';
import EditEmployee from '../pages/editEployee';
import JobExclusion from '../pages/Exclusion/JobExclusion';
import ItemExclusion from '../pages/Exclusion/ItemExclusion';
import EmployeeExclusion from '../pages/Exclusion/EmployeeExclusion';
import IngredientExclusion from '../pages/Exclusion/IngredientExclusion';
import CategoryExclusion from '../pages/Exclusion/CategoryExclusion';
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
        <Screen name="CompleteOrder" component={CompleteOrder} />
        <Screen name="EditEmployee" component={EditEmployee} />
        <Screen name="JobExclusion" component={JobExclusion} />
        <Screen name="ItemExclusion" component={ItemExclusion} />
        <Screen name="EmployeeExclusion" component={EmployeeExclusion} />
        <Screen name="IngredientExclusion" component={IngredientExclusion} />
        <Screen name="CategoryExclusion" component={CategoryExclusion} />
      </Navigator>

    );
  }
}

export default AppStack;