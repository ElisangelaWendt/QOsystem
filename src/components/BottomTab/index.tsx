import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { colors } from "../../styles/colors";
import { Feather } from "@expo/vector-icons";
import Orders from "../../pages/orders";
import Employee from "../../pages/employee";
import Home from "../../pages/home";


const Tab = createMaterialBottomTabNavigator();

export default function MyTab() {

  return (
      <Tab.Navigator 
      barStyle={{backgroundColor: colors.bottomBar, height:56}}
      initialRouteName="Home"
      labeled={false}
      activeColor="white"
      >
        <Tab.Screen name="Orders" component={Orders}  options={{tabBarIcon:({color}) => (<Feather name="file-minus" size={25}/>)}}/>
        <Tab.Screen name="Home" options={{tabBarIcon:({color}) => (<Feather name="home" size={25}/>)}}  component={Home} />
        <Tab.Screen name="Employee" component={Employee} options={{tabBarIcon:({color}) => (<Feather name="user" size={25}/>)}}/>
      </Tab.Navigator>

  );
}