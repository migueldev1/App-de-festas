import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Switch, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  // Função para lidar com a ativação/desativação das notificações
  const toggleNotifications = () => {
    setIsNotificationsEnabled((previousState) => !previousState);
    if (!isNotificationsEnabled) {
      Vibration.vibrate(); // Faz o celular vibrar quando ativar notificações
    }
  };

  // Função para realizar o logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      navigation.replace('Login'); // Navega para a tela de login após sair
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.setting}>
        <Text style={styles.text}>Ativar notificações</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <Button title="Sair da conta" onPress={handleLogout} color="#FF0000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default SettingsScreen;
