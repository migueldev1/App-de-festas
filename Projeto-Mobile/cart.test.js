const test = require('ava');
const { handleAddToCart } = require('./cart');

test('O programa adiciona um produto ao carrinho', t => {
  const cart = [];
  const product = { id: '1', title: 'Kit Diamante' };

  const result = handleAddToCart(cart, product);

  t.is(result, `${product.title} adicionado ao carrinho!`);
  t.is(cart.length, 1);
  t.deepEqual(cart[0], product);
});

test('O programa não adiciona um produto duplicado', t => {
  const cart = [{ id: '1', title: 'Kit Diamante' }];
  const product = { id: '1', title: 'Kit Diamante' };

  const result = handleAddToCart(cart, product);

  t.is(result, `${product.title} já está no carrinho!`);
  t.is(cart.length, 1);
});
