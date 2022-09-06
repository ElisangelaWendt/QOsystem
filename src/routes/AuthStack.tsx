import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login/';
import { useFonts
} from 'expo-font';
const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    let [fontsLoaded] = useFonts({
      'SairaStencilOne': require('./assets/fonts/SairaStencilOne-Regular.otf')
      });

      if (!fontsLoaded) {
        
      } else {
    return (
        <Navigator initialRouteName="Inicial" screenOptions={{ headerShown: false }}>
            <Screen name="Inicial" component={Login} />
        </Navigator>
    );
      }
}

export default AppStack;