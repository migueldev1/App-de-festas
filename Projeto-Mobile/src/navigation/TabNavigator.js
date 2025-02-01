import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import PedidosScreen from '../screens/PedidosScreen';
import Cadastro2 from '../screens/Cadastro2';
import { fetchLoggedUserData } from '../api'; // Importando a função

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchLoggedUserData();
        if (userData) {
          setUsername(userData.username);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Pedidos') {
            iconName = 'list-alt';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pedidos" component={PedidosScreen} />
      <Tab.Screen 
        name="Perfil" 
        component={Cadastro2} 
        initialParams={{ username }} // Passando o username como parâmetro inicial
        listeners={{
          focus: () => {
            // Atualiza o username quando a aba Perfil é focada
            fetchLoggedUserData().then(userData => {
              if (userData) {
                setUsername(userData.username);
              }
            });
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
