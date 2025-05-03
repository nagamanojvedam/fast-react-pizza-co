const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 10,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],

  soldOut: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
