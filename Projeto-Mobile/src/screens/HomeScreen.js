import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { LinearGradient } from 'expo-linear-gradient'; // Para o fundo com gradiente
import { fetchLoggedUserData } from '../api';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchLoggedUserData();
        if (userData) {
          setUsername(userData.username);
          setName(userData.nome || '');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <LinearGradient 
      colors={['#87CEFA', '#1E90FF']} // Gradiente de festa (vermelho e laranja)
      style={styles.container}
    >
      <Text style={styles.welcome}>Bem-vindo(a) {name}!</Text>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Cadastro2', { username, title: 'Perfil' })}>
        <Icon name="person" size={30} color="#fff" />
        <Text style={styles.boxText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Loja', { username })}>
        <Icon name="store" size={30} color="#fff" />
        <Text style={styles.boxText}>Loja</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Configurações')}>
        <Icon name="settings" size={30} color="#fff" />
        <Text style={styles.boxText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Pedidos', { username })}>
        <Icon name="list-alt" size={30} color="#fff" />
        <Text style={styles.boxText}>Pedidos</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 20,
    borderRadius: 25, // Bordas arredondadas
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4, // Elevação para Android
  },
  boxText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    
  },
});

export default HomeScreen;
