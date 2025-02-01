const processOrders = (orders) => {
    // Supõe que orders é um array de objetos com { id, valor }
    return orders.reduce((total, order) => total + order.valor, 0);
  };
  
module.exports = { processOrders };
  