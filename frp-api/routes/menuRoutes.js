const express = require("express");
const menuController = require("../controllers/menuController");

const router = express.Router();

router.route("/").get(menuController.getMenu).post(menuController.createItem);

module.exports = router;
