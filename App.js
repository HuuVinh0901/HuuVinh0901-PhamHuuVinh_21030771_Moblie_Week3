import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import React from 'react';
import { CartProvider } from './screens/CartContext';
import Screen_01 from './screens/Screen_01';
import Screen_02 from './screens/Screen_02';
import Screen_03 from './screens/Screen_03';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen_01" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Screen_01" component={Screen_01} />
        <Stack.Screen name="Screen_02" component={Screen_02} />
        <Stack.Screen name="Screen_03" component={Screen_03} />

      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
    </CartProvider>
);
}