import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen'; // Ajuste o caminho conforme necessário
import RegisterScreen from './src/screens/RegisterScreen'; // Ajuste o caminho conforme necessário
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PedidosScreen from './src/screens/PedidosScreen';
import Cadastro2 from './src/screens/Cadastro2'
import LojaScreen from './src/screens/LojaScreen' // Ajuste o caminho conforme necessário
import TabNavigator from './src/navigation/TabNavigator'; 
import DrawerNavigator from './src/navigation/DrawerNavigator';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Loja" component={LojaScreen} />
        <Stack.Screen name="Registrar" component={RegisterScreen} />
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Configurações" component={SettingsScreen} />
        <Stack.Screen name="Pedidos" component={PedidosScreen} />
        <Stack.Screen name="Cadastro2" component={Cadastro2} />
        <Stack.Screen 
          name="Home" 
          component={DrawerNavigator} 
          options={{ headerShown: false }} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
