import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const PedidosScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({ name: '', age: '', neighborhood: '' }); // Para armazenar os dados do usuário

  // Função para buscar dados do usuário (adapte conforme necessário)
  const fetchUserData = async () => {
    try {
      const usersData = await SecureStore.getItemAsync('users');
      if (usersData) {
        const parsedData = JSON.parse(usersData);
        const loggedEmail = await SecureStore.getItemAsync('loggedEmail'); // Email logado
        const currentUser = parsedData[loggedEmail]; // Dados do usuário atual
        console.log('Usuário atual:', currentUser);
        if (currentUser) {
          // Atualiza o estado com os dados do usuário atual
          setUserData({
            name: currentUser.nome || '',
            age: currentUser.idade || '',
            neighborhood: currentUser.bairro || '',
          });
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const existingCart = await SecureStore.getItemAsync('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      setCartItems(cart);
    } catch (error) {
      console.error('Erro ao buscar itens do carrinho:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
      fetchUserData(); // Buscar os dados do usuário
    }, [])
  );

  const handleRemoveFromCart = async (itemToRemove) => {
    try {
      const existingCart = await SecureStore.getItemAsync('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];
      cart = cart.filter(item => item.id !== itemToRemove.id);
      await SecureStore.setItemAsync('cart', JSON.stringify(cart));
      setCartItems(cart);
      alert(`${itemToRemove.title} removido do carrinho!`);
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Certifique-se de que o preço está no formato esperado
      const priceString = item.price.replace('R$', '').trim(); // Remove "R$" e espaços
      const price = parseFloat(priceString.replace(',', '.')); // Converte para float, se necessário
      console.log(`Calculando preço para ${item.title}: ${priceString} -> ${price}`); // Log para depuração
      return total + (isNaN(price) ? 0 : price); // Verifica se o valor é um número
    }, 0).toFixed(2);
  };
  
  

  const formatMessage = () => {
    const items = cartItems.map(item => item.title).join(', ');
    const total = calculateTotal();
    return `Olá, meu nome é *${userData.name}*, tenho *${userData.age}* anos e moro no endereço: \n\n*${userData.neighborhood}*. \n\nGostaria de pedir: *${items}*. \n\nTotalizando em um total de *R$ ${total}*.`;
  };

  const handleFinalizarPedido = () => {
    const message = formatMessage();
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5521979354409'; // Insira o número de telefone (com código do país)
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    Linking.openURL(whatsappLink);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity 
        style={styles.removeButton} 
        onPress={() => handleRemoveFromCart(item)}
      >
        <Text style={styles.buttonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  const isUserDataComplete = userData.name && userData.age && userData.neighborhood;

  return (
    <View style={styles.container}>
      {isUserDataComplete ? (
        <>
          <Text style={styles.header}>Meus Pedidos</Text>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.totalText}>Total: R$ {calculateTotal()}</Text>
          <TouchableOpacity style={styles.finalizarButton} onPress={handleFinalizarPedido}>
            <Text style={styles.buttonText}>Finalizar Pedido</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.errorMessage}>Cadastre seus dados primeiro antes de entrar nessa aba!</Text>
          <TouchableOpacity 
            style={styles.cadastroButton} 
            onPress={() => navigation.navigate('Cadastro2')} 
          >
            <Text style={styles.buttonText}>Ir para Cadastro</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  cadastroButton: {
    backgroundColor: '#6200ee', // Cor do botão
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20, // Margem superior para espaçar do texto
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  finalizarButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorMessage: {
    color: '#d9534f',
    fontSize: 16,
    marginTop: 20,
  },
});

export default PedidosScreen;
