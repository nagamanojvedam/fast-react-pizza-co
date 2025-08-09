const Item = require("../models/itemModel");

exports.createItem = async (req, res) => {
  const item = await Item.findOne({ id: req.body.id });

  if (item) {
    return res.status(400).json({
      status: "failed",
      message: "Item already exists",
    });
  }

  const newItem = new Item(req.body);

  if (!newItem)
    return res.status(400).json({
      status: "error",
      message: "Error adding item to menu",
    });

  await newItem.save();

  const { id, name, unitPrice, imageUrl, ingredients, soldOut } = newItem;

  return res.status(200).json({
    status: "success",
    item: {
      id,
      name,
      unitPrice,
      imageUrl,
      ingredients,
      soldOut,
    },
  });
};

exports.updateItem = async (req, res) => {};
exports.getItem = async (req, res) => {};
exports.deleteItem = async (req, res) => {};

exports.getMenu = async (req, res) => {
  const menu = await Item.find().select("-_id -__v");

  if (!menu)
    return res.status(400).json({
      status: "error",
      message: "There was a problem getting menu",
    });

  return res.status(200).json({
    status: "success",
    data: menu,
  });
};
