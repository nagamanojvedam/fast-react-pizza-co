const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: { type: String, required: true, unique: true },
  unitPrice: { type: Number, required: true, min: 10 },
  imageUrl: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  soldOut: { type: Boolean, default: false },
});

module.exports = mongoose.model("Item", itemSchema);
