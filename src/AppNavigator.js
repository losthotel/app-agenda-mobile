import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuScreen from './modules/menu/components/screens/MenuScreen';
import CalendarScreen from './modules/calendar/components/screens/CalendarScreen';
import SettingsScreen from './modules/settings/components/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={CalendarScreen} />
        <Stack.Screen name="Calendário" component={CalendarScreen} />
        <Stack.Screen name="Configurações" component={SettingsScreen} />
        <Stack.Screen name="ReturnMenu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
