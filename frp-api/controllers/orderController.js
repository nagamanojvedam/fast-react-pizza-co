const Order = require("../models/orderModel");

const { generateOrderId, getEstimatedDelivery } = require("../utils/helper");

exports.createOrder = async (req, res) => {
  const orderPrice = req.body.cart.reduce(
    (res, curr) => res + curr.totalPrice,
    0,
  );

  const newOrder = new Order({
    ...req.body,
    status: "preparing",
    id: generateOrderId(),
    estimatedDelivery: getEstimatedDelivery(req.body.cart.length),
    orderPrice,
    priorityPrice: req.body.priority ? orderPrice * 0.1 : 0,
  });

  if (!newOrder)
    return res.status(400).json({
      status: "error",
      message: "Problem creating order",
    });

  await newOrder.save();

  return res.status(200).json({
    status: "success",
    data: newOrder,
  });
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOne({ id });

  if (!order)
    return res.status(400).json({
      status: "error",
      message: "No order found",
    });

  return res.status(200).json({
    status: "success",
    data: order,
  });
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findOne({ id: req.params.id });

  if (!order)
    return res.status(400).json({
      status: "error",
      message: "Cannot update this order",
    });

  order.priority = req.body.priority;
  order.priorityPrice = parseFloat((0.1 * order.orderPrice).toFixed(2));

  await order.save();

  return res.status(200).json({
    status: "success",
    data: order,
  });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find();

  if (!orders)
    return res.status(400).json({
      status: "error",
      message: "Cannot find the orders",
    });

  return res.status(200).json({
    status: "success",
    data: orders,
  });
};
