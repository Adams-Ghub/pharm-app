import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Signup from '../screens/signup';
import PharmacistNavigation from './pharmacist-navigation';
import ClientNavigation from './client-navigation';

function MainNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ header: () => {} }}  />
      <Stack.Screen name="Signup" component={Signup} options={{ header: () => {} }} />
      <Stack.Screen
        name="PharmacistWelcome"
        component={PharmacistNavigation}
        options={{ header: () => {} }}
      />
      <Stack.Screen
        name="ClientWelcome"
        component={ClientNavigation}
        options={{ header: () => {} }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
