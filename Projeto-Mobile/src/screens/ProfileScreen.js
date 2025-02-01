import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { updateUserData } from '../api'; // Certifique-se de que a função está correta

const Cadastro2 = ({ route }) => {
  const { username } = route.params; // Username é passado como parâmetro
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingNeighborhood, setIsEditingNeighborhood] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersData = await SecureStore.getItemAsync('users');
        console.log('Dados dos usuários:', usersData); // Debug: Verifique o que está sendo recuperado
        if (usersData) {
          const parsedData = JSON.parse(usersData);
          const loggedEmail = await SecureStore.getItemAsync('loggedEmail'); // Email logado
          const currentUser = parsedData[loggedEmail]; // Dados do usuário atual
          console.log('Usuário atual:', currentUser); // Debug: Verifique os dados do usuário atual
          
          if (currentUser) {
            setName(currentUser.nome || '');
            setAge(currentUser.idade || '');
            setNeighborhood(currentUser.bairro || '');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const usersData = await SecureStore.getItemAsync('users');
      const parsedData = usersData ? JSON.parse(usersData) : {};
      
      // Atualiza os dados do usuário com as novas informações
      const loggedEmail = await SecureStore.getItemAsync('loggedEmail'); // Email logado
      if (parsedData[loggedEmail]) {
        parsedData[loggedEmail] = {
          ...parsedData[loggedEmail], // Mantém os dados existentes
          nome: name,
          idade: age,
          bairro: neighborhood,
        };
      }
      
      // Salva os dados atualizados de volta no SecureStore
      await SecureStore.setItemAsync('users', JSON.stringify(parsedData));
      
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      setIsEditingName(false);
      setIsEditingAge(false);
      setIsEditingNeighborhood(false);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar os dados: ' + error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Nome:</Text>
        {isEditingName ? (
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            onBlur={() => setIsEditingName(false)}
          />
        ) : (
          <>
            <Text style={styles.info}>{username || "Clique no ícone de editar para adicionar um nome"}</Text>
            <TouchableOpacity onPress={() => setIsEditingName(true)}>
              <Text style={styles.editText}>✏️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Idade:</Text>
        {isEditingAge ? (
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            onBlur={() => setIsEditingAge(false)}
          />
        ) : (
          <>
            <Text style={styles.info}>{age || "Clique no ícone de editar para adicionar uma idade"}</Text>
            <TouchableOpacity onPress={() => setIsEditingAge(true)}>
              <Text style={styles.editText}>✏️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Bairro:</Text>
        {isEditingNeighborhood ? (
          <TextInput
            style={styles.input}
            value={neighborhood}
            onChangeText={setNeighborhood}
            onBlur={() => setIsEditingNeighborhood(false)}
          />
        ) : (
          <>
            <Text style={styles.info}>{neighborhood || "Clique no ícone de editar para adicionar um bairro"}</Text>
            <TouchableOpacity onPress={() => setIsEditingNeighborhood(true)}>
              <Text style={styles.editText}>✏️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 30,
    color: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  infoContainer: {
    marginBottom: 20,
  },
  editText: {
    fontSize: 18,
    color: '#007BFF',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Cadastro2;
