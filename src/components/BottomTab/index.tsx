import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { colors } from "../../styles/colors";

import Home from "../../pages/home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu from "../../pages/menu";
import FinishOrders from "../../pages/finishOrders";


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
        <Tab.Screen name="FinishOrders" component={FinishOrders} options={{tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="currency-usd" color={color} size={25} />
          ),}}/>
      </Tab.Navigator>

  );
}