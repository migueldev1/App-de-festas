import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api';
import { useNavigation } from '@react-navigation/native';
import * as Crypto from 'expo-crypto';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Estado "Me manter conectado"
  const navigation = useNavigation();

  useEffect(() => {
    // Carregar as credenciais salvas (se existirem)
    const loadStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');
        if (storedEmail && storedPassword) {
          // Logar automaticamente se as credenciais estiverem salvas
          setEmail(storedEmail);
          setPassword(storedPassword);
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Erro ao carregar credenciais:', error);
      }
    };
    loadStoredCredentials();
  }, []);

  const encryptPassword = async (password) => {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hash;
  };

  const handleLogin = async () => {
    try {
      const encryptedPassword = await encryptPassword(password);
      const response = await loginUser(email, encryptedPassword);
      setMessage(response.message);
      if (rememberMe) {
        // Salvar email e senha criptografada se "Me manter conectado" estiver ativado
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', encryptedPassword);
      }
      navigation.replace('Home');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <LinearGradient colors={['#87CEFA', '#1E90FF']} style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Festas Encantadas & Cia</Text>
        
        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>Me manter conectado</Text>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Registrar')}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        
        {message ? <Text>{message}</Text> : null}
      </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  loginContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rememberMeText: {
    fontSize: 16,
    color: '#000',
  },
});

export default LoginScreen;
