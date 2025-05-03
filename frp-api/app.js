const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const menuRouter = require("./routes/menuRoutes");
const orderRouter = require("./routes/orderRouters");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", orderRouter);

module.exports = app;
