import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'; // Usa o TabNavigator aqui
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PedidosScreen from '../screens/PedidosScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomeTabs">
      <Drawer.Screen name="HomeTabs" component={TabNavigator} options={{ title: 'Festas encantadas & Cia' }} /> 
      <Drawer.Screen name="Configurações" component={SettingsScreen} />
      <Drawer.Screen name="Pedidos" component={PedidosScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
