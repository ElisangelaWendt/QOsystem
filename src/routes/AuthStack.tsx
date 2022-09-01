import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/';
// import { useFonts, Rajdhani_300Light,
//     Rajdhani_400Regular,
//     Rajdhani_500Medium,
//     Rajdhani_600SemiBold,
//     Rajdhani_700Bold,
// } from '@expo-google-fonts/rajdhani';
const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    // let [fontsLoaded] = useFonts({
    //     Rajdhani_300Light,
    //     Rajdhani_400Regular,
    //     Rajdhani_500Medium,
    //     Rajdhani_600SemiBold,
    //     Rajdhani_700Bold,
    //   });

      // if (!fontsLoaded) {
      //   return <AppLoading />;
      // } else {
    return (
        <Navigator initialRouteName="Inicial" screenOptions={{ headerShown: false }}>
            <Screen name="Inicial" component={Login} />
        </Navigator>
    );
      }
// }

export default AppStack;