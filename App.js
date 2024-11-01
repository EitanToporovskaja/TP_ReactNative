import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Views/Home/Home';
import Menu from './Views/Menu/Menu';
import BuscarPlato from './Components/BuscarPlato/BuscarPlato';
import DetallePlato from './Components/DetallePlato/DetallePlato';
import { MenuProvider } from './MenuContext'

const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BuscarPlato" component={BuscarPlato} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="DetallePlato" component={DetallePlato} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
