import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import editIcon from '../img/45706.png'; 

const Cadastro2 = ({ navigation, route }) => {
  const { username } = route.params || {}; 
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [isEditingNeighborhood, setIsEditingNeighborhood] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState(null); 
  const saveAvatar = async (base64) => {
    try {
      await AsyncStorage.setItem('@avatar', base64);
      console.log('Avatar salvo com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar o avatar:', e);
    }
  };
  const loadAvatar = async () => {
    try {
      const savedAvatar = await AsyncStorage.getItem('@avatar');
      if (savedAvatar !== null) {
        setAvatarBase64(savedAvatar);
        
      }
    } catch (e) {
      console.error('Erro ao carregar o avatar:', e);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      Alert.alert("Você precisa permitir o acesso à galeria!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log('Resultado da seleção de imagem:', result);
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
  
      if (uri) {
        console.log('URI da imagem:', uri);
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setAvatarBase64(base64);
        console.log('Imagem em Base64:', base64);
  
        // Salvar o avatar no AsyncStorage
        await saveAvatar(base64);
      } else {
        console.error('URI da imagem não está disponível.');
      }
    } else {
      console.warn('Seleção de imagem cancelada.');
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Perfil' }); // Define o título como 'Perfil'
  }, [navigation]);

  useEffect(() => {
    loadAvatar();
    const fetchUserData = async () => {
      try {
        const usersData = await SecureStore.getItemAsync('users');
        if (usersData) {
          const parsedData = JSON.parse(usersData);
          const loggedEmail = await SecureStore.getItemAsync('loggedEmail'); // Email logado
          const currentUser = parsedData[loggedEmail]; // Dados do usuário atual
          console.log('Usuário atual:', currentUser);
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
      <TouchableOpacity style={styles.avatar} onPress={pickImage}>
  {avatarBase64 ? (
    <Image 
      source={{ uri: `data:image/jpeg;base64,${avatarBase64}` }} 
      style={styles.avatarImage} 
    />
  ) : (
    <Text style={styles.avatarText}>+</Text>
  )}
</TouchableOpacity>
        <View style={styles.infoContainer}>
          
  <TouchableOpacity 
    style={styles.inputContainer2} 
    onPress={() => {
      setIsEditingName(true);
      setIsEditingNeighborhood(false);
      setIsEditingAge(false);
    }}
  >
    {isEditingName ? (
      <TextInput
        style={styles.inputName}
        value={name}
        onChangeText={setName}
        onBlur={() => setIsEditingName(false)}
      />
    ) : (
      <Text style={[styles.info, { fontSize: 30, fontWeight: 'bold' }]}>
  {name || "Toque para adicionar um nome"}
</Text>
    )}
  </TouchableOpacity>
</View>

      </View>
      

      <View style={styles.infoContainer}>
      
      <Text style={styles.label}>Idade</Text>
      
  <TouchableOpacity 
    style={styles.inputContainer} 
    onPress={() => {
      setIsEditingAge(true);
      setIsEditingNeighborhood(false);
      setIsEditingName(false);
    }}
  >
    {isEditingAge ? (
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        onBlur={() => setIsEditingAge(false)}
      />
    ) : (
      <Text style={styles.info}>{age || "Toque para adicionar uma idade"}</Text>
      
    )}
  </TouchableOpacity>
  
  
</View>

      <View style={styles.infoContainer}>
        
      <Text style={styles.label}>Endereço</Text>
  <TouchableOpacity 
    style={styles.inputContainer} 
    onPress={() => {
      setIsEditingNeighborhood(true);
      setIsEditingAge(false);
      setIsEditingName(false);
    }}
  >
    {isEditingNeighborhood ? (
      <TextInput
        style={styles.input}
        value={neighborhood}
        onChangeText={setNeighborhood}
        onBlur={() => setIsEditingNeighborhood(false)}
      />
    ) : (
      <Text style={styles.info}>{neighborhood || "Toque para adicionar um endereço"}</Text>
    )}
  </TouchableOpacity>
  
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
    marginLeft: 10, // Ajuste para espaçamento
  },
  editText2: {
    fontSize: 18,
    color: '#007BFF',
    marginLeft: 0,
    alignSelf: 'center', // Ajuste para espaçamento
  },
  inputContainer: {
    flexDirection: 'row', // Muda a direção para linha
    alignItems: 'center', // Centraliza verticalmente
    justifyContent: 'space-between', // Espaçamento entre texto e botão
    width: '100%',
  },
  inputContainer2: {
    alignItems: 'center', // Centraliza verticalmente
    justifyContent: 'flex-start',
    borderRadius: 5, // Espaçamento entre texto e botão
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1, // Faz o TextInput ocupar o espaço restante
    marginRight: 10, // Espaço entre o TextInput e o botão de editar
  },
  inputName: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',  // Alinha os itens na horizontal
    alignItems: 'center',  // Centraliza verticalmente
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    width: 20,
    height: 20,
    marginLeft: 15, // Para dar um espaço entre o texto e a imagem
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
