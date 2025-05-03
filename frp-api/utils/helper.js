exports.generateOrderId = () => {
  const timeStamp = Date.now();
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();

  return `FRP${timeStamp}${randomPart}`;
};

exports.getEstimatedDelivery = (items) => {
  return `${new Date(Date.now() + items * 10 * 60 * 1000).toISOString()}`;
};

const cart = [];

const orderPrice = cart.reduce((res, curr) => res + curr.totalPrice, 0);
