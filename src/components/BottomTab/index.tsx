import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { colors } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";

import Employee from "../../pages/employee";
import Home from "../../pages/home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CloseOrder from "../../pages/closeOrder";
import Orders from "../../pages/finishOrders";
import Menu from "../../pages/menu";


const Tab = createMaterialBottomTabNavigator();

export default function MyTab() {

  return (
      <Tab.Navigator 
      barStyle={{backgroundColor: colors.bottomBar, height:56}}
      initialRouteName="Home"
      labeled={false}
      activeColor={colors.buttonText}
      >
        <Tab.Screen  name="Menu" component={Menu}  options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" color={color} size={25} />
          ),}}/>
        <Tab.Screen name="Home" options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={25} />
          ),}}  component={Home} />
        <Tab.Screen name="Orders" component={Orders} options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="currency-usd" color={color} size={25} />
          ),}}/>
      </Tab.Navigator>

  );
}