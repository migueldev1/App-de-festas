import * as SecureStore from 'expo-secure-store';

// Função para registrar um usuário
export async function createUser(data) {
  try {
    // Armazena os dados do usuário no SecureStore
    await SecureStore.setItemAsync(data.username, JSON.stringify(data));
  } catch (error) {
    throw new Error('Erro ao registrar o usuário: ' + error.message);
  }
}

// Função para registrar um usuário
export const registerUser = async (username, email, password) => {
  try {
    const storedUsers = JSON.parse(await SecureStore.getItemAsync('users')) || {};

    // Verifica se o nome de usuário já existe
    if (storedUsers[username]) {
      throw new Error('Nome de usuário já existe');
    }

    // Verifica se o email já existe
    const emailExists = Object.values(storedUsers).some(user => user.email === email);
    if (emailExists) {
      throw new Error('Email já registrado');
    }

    // Armazena o novo usuário
    storedUsers[email] = { username, password };
    await SecureStore.setItemAsync('users', JSON.stringify(storedUsers));

    return { message: 'Usuário registrado com sucesso' };
  } catch (error) {
    throw new Error('Erro ao registrar o usuário: ' + error.message);
  }
};




// Login
// Função para fazer login
export const loginUser = async (email, password) => { // Alterar de username para email
  try {
    const users = await SecureStore.getItemAsync('users');
    const parsedUsers = users ? JSON.parse(users) : {};

    // Verifique se o usuário existe através do email
    const userData = parsedUsers[email];

    if (userData) {
      // Compare a senha
      if (userData.password === password) {
        await SecureStore.setItemAsync('loggedEmail', email); // Armazena o email logado
        return { message: 'Login bem-sucedido', userData }; // Retorna os dados do usuário logado
        
      } else {
        throw new Error('Credenciais incorretas');
      }
    } else {
      throw new Error('Usuário não encontrado');
    }
  } catch (error) {
    throw new Error('Erro ao fazer login: ' + error.message);
  }
};

// Função para buscar informações do usuário logado
export const fetchLoggedUserData = async () => {
  try {
    const loggedEmail = await SecureStore.getItemAsync('loggedEmail');
    const users = await SecureStore.getItemAsync('users');
    const parsedUsers = users ? JSON.parse(users) : {};

    // Retorna os dados do usuário logado
    return parsedUsers[loggedEmail] || null; // Retorna os dados do usuário ou null se não encontrado
  } catch (error) {
    throw new Error('Erro ao buscar dados do usuário logado: ' + error.message);
  }
};

// Função para limpar os dados de autenticação (opcional)
export const clearCredentials = async () => {
  try {
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('email');
    await SecureStore.deleteItemAsync('password');
  } catch (error) {
    throw new Error('Erro ao limpar credenciais');
  }
};