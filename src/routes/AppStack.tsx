import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/login';
import PasswordRecovery from '../pages/passwordRecovery';
// import {
//   useFonts, Rajdhani_300Light,
//   Rajdhani_400Regular,
//   Rajdhani_500Medium,
//   Rajdhani_600SemiBold,
//   Rajdhani_700Bold,
// } from '@expo-google-fonts/rajdhani';
const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  // let [fontsLoaded] = useFonts({
  //   Rajdhani_300Light,
  //   Rajdhani_400Regular,
  //   Rajdhani_500Medium,
  //   Rajdhani_600SemiBold,
  //   Rajdhani_700Bold,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
    return (

      <Navigator initialRouteName="Home" screenOptions={{ headerShown: false, cardStyle: {  }, }} >
        <Screen name="Login" component={Login} />
        <Screen name="PasswordRecovery" component={PasswordRecovery} />
      </Navigator>

    );
  }
// }

export default AppStack;