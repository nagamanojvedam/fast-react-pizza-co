const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  customer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: "",
  },
  cart: [
    {
      _id: false,
      pizzaId: { type: Number, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  estimatedDelivery: {
    type: Date,
    required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  priorityPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
