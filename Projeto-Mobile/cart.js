const handleAddToCart = (cart, product) => {
  // Verifica se o produto já está no carrinho
  const isProductInCart = cart.some(item => item.id === product.id);

  if (isProductInCart) {
    return `${product.title} já está no carrinho!`;
  }

  // Adiciona o produto ao carrinho se não estiver lá
  cart.push(product);
  return `${product.title} adicionado ao carrinho!`;
};

module.exports = { handleAddToCart };
