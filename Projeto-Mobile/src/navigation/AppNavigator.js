import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import PedidosScreen from '../screens/PedidosScreen';
import HomeScreen from '../screens/HomeScreen'; // Certifique-se de ter esta tela
import SettingsScreen from '../screens/SettingsScreen'; // Se você tiver uma tela de configurações
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';


// Stack Navigator
const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Aplicativo de Festa' }} // Definindo o título aqui
      />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Configurações" component={SettingsScreen} />
      <Stack.Screen name="Pedidos" component={PedidosScreen} />
    </Stack.Navigator>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Aplicativo de Festa">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Aplicativo de Festa' }} /> 
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Configurações" component={SettingsScreen} />
      <Drawer.Screen name="Pedidos" component={PedidosScreen} />
    </Drawer.Navigator>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        title: 'Aplicativo de Festa'
        }} 
      />
      <Tab.Screen 
        name="Configurações" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Pedidos" 
        component={PedidosScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-alt" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

// Escolha de Navegação
export default function AppNavigator({ navigationType }) {
  return (
    <NavigationContainer>
      {navigationType === 'drawer' && <DrawerNavigator />}
      {navigationType === 'stack' && <StackNavigator />}
      {navigationType === 'tab' && <TabNavigator />}
    </NavigationContainer>
  );
}