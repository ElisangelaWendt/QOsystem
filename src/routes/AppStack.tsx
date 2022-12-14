import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import PasswordRecovery from '../pages/passwordRecovery';
// import {Home} from '../pages/home';
import {useFonts, SairaStencilOne_400Regular,
} from '@expo-google-fonts/dev';
import MyTab from '../components/BottomTab';
import AppLoading from 'expo-app-loading';
import ItemList from '../pages/itemList';
import ItemDetails from '../pages/itemDetails';
import OpenOrder from '../pages/openOrder';
import Employee from '../pages/employee';
import IncompleteOrder from '../pages/IncompleteOrder';
import EditEmployee from '../pages/editEployee';
import JobExclusion from '../pages/Exclusion/JobExclusion';
import ItemExclusion from '../pages/Exclusion/ItemExclusion';
import EmployeeExclusion from '../pages/Exclusion/EmployeeExclusion';
import IngredientExclusion from '../pages/Exclusion/IngredientExclusion';
import EmployeeRegister from '../pages/EmployeeRegister/index';
import CategoryRegister from '../pages/categoryRegister';
import JobRegister from '../pages/JobRegister';
import IngredientRegister from '../pages/ingredientRegister';
import ItemRegister from '../pages/itemRegister';
import CategoryExclusion from '../pages/Exclusion/CategoryExclusion';
import TableExclusion from '../pages/Exclusion/TableExclusion';
import TableRegister from '../pages/TableRegister';
import EditIngredient from '../pages/editIngredient';
import EditItem from '../pages/editItem';
import Item from '../pages/Item';
import Ingredient from '../pages/ingredient';
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
        {/* <Screen name="PasswordRecovery" component={PasswordRecovery} /> */}
        <Screen name="BottomTab" component={MyTab} />
        <Screen name="ItemList" component={ItemList} />
        <Screen name="ItemDetails" component={ItemDetails} />
        <Screen name="CategoryRegister" component={CategoryRegister} />
        <Screen name="OpenOrder" component={OpenOrder} />
        <Screen name="JobRegister" component={JobRegister} />
        <Screen name="IngredientRegister" component={IngredientRegister} />
        <Screen name="ItemRegister" component={ItemRegister} />
        <Screen name="IncompleteOrder" component={IncompleteOrder} />
        <Screen name="EditEmployee" component={EditEmployee} />
        <Screen name="JobExclusion" component={JobExclusion} />
        <Screen name="ItemExclusion" component={ItemExclusion} />
        <Screen name="EmployeeExclusion" component={EmployeeExclusion} />
        <Screen name="IngredientExclusion" component={IngredientExclusion} />
        <Screen name="CategoryExclusion" component={CategoryExclusion} />
        <Screen name="TableExclusion" component={TableExclusion} />
        <Screen name="TableRegister" component={TableRegister} />
        <Screen name="EditIngredient" component={EditIngredient} />
        <Screen name="EditItem" component={EditItem} />
        <Screen name="Item" component={Item} />
        <Screen name="Ingredient" component={Ingredient} />
      </Navigator>

    );
  }
}

export default AppStack;