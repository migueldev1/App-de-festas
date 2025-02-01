const test = require('ava');
const { processOrders } = require('./orders');

test('processOrders retorna o valor total dos pedidos', t => {
  const orders = [
    { id: 1, valor: 100 },
    { id: 2, valor: 200 },
    { id: 3, valor: 300 },
  ];
  
  const total = processOrders(orders);
  t.is(total, 600);
});
