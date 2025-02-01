import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Button, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const products = [
  {
    id: '1',
    title: 'Kit Diamante',
    image: require('../img/kitDiamante.jpg'),
    description: 'O kit com mais itens!',
    details: 'O Kit Diamante inclui: \n\n- Painel redondo com capa\n- Painel Romano com capa\n- 3 Mesas cilindros com capas\n- Displays do tema.\n- Bandejas.\n- 1 vaso com flores ou buchinho.\n- 1 Tapete\n- 1 Escadinha de lembrancinha.',
    price: 'R$ 200',
  },
  {
    id: '2',
    title: 'Kit Ouro',
    image: require('../img/kitOuro.jpg'),
    description: 'Kit Ouro pode ser perfeito para o que você procura!',
    details: 'O Kit Ouro inclui: \n\n- Painel redondo com capa\n- 3 Mesas cilindros com capas\n- Displays do tema.\n- Bandejas.\n- 1 vaso com flores ou buchinho.\n- 1 Tapete\n- 1 Escadinha de lembrancinha.\n- 1 Mesa reta',
    price: 'R$ 180',
  },
  {
    id: '3',
    title: 'Kit Prata',
    image: require('../img/kitPrata.jpg'),
    description: 'Para você que quer uma festa básica porém bem feita!',
    details: 'O Kit Prata inclui: \n\n- Painel redondo com capa\n- 3 Mesas cilindros com capas\n- Displays do tema.\n- Bandejas.\n- 1 vaso com flores ou buchinho.\n- 1 Tapete\n- 1 Escadinha de lembrancinha.',
    price: 'R$ 160',
  },
  {
    id: '4',
    title: 'Kit Bronze',
    image: require('../img/kitBronze.jpg'),
    description: 'Para você que quer uma festa sem gastar muito!',
    details: 'O Kit Bronze inclui: \n\n- Painel redondo com capa\n- 3 Mesas cilindros com capas\n- Displays do tema.\n- 1 vaso com flores ou buchinho.\n- 1 Tapete\n- 1 Escadinha de lembrancinha.',
    price: 'R$ 140',
  },
];

const LojaScreen = ({ navigation, route }) => {
  const { username } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = async (product) => {
    try {
      const existingCart = await SecureStore.getItemAsync('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
  
      // Verifica se o produto já está no carrinho
      const isProductInCart = cart.some(item => item.id === product.id);
  
      if (isProductInCart) {
        alert(`${product.title} já está no carrinho!`);
        return; // Retorna sem adicionar se o produto já estiver no carrinho
      }
  
      // Adiciona o produto ao carrinho se não estiver lá
      cart.push(product);
      await SecureStore.setItemAsync('cart', JSON.stringify(cart));
      alert(`${product.title} adicionado ao carrinho!`);
      console.log('Produto adicionado:', product);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            setSelectedProduct(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Mais Informações</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button2} 
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produtos Disponíveis</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true} // Mudado para true
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <ScrollView>
                  <Text style={styles.modalDescription}>{selectedProduct.details}</Text>
                </ScrollView>
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  productContainer: {
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
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 5,
    padding: 8.5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  button2: {
    backgroundColor: '#6200ee',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adicionado fundo semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%', // Largura reduzida
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default LojaScreen;
