const mongoose = require("mongoose");
const cron = require("node-cron");

const Order = require("./models/orderModel");

const app = require("./app");

const { PORT, MONGODB_URL } = process.env;
mongoose.connect(MONGODB_URL).then((conn) => {
  console.log(`Connected to: ${conn.connection.name}`);
});

cron.schedule("*/10 * * * * *", async () => {
  try {
    const now = new Date();

    //     Mark as 'Delivered' if estimated delivery has passed
    const deliveredResult = await Order.updateMany(
      { estimatedDelivery: { $lte: now } },
      { $set: { status: "delivered" } }
    );
    console.log(
      `[${new Date().toISOString()}] Updated ${
        deliveredResult.modifiedCount
      } orders.`
    );
  } catch (err) {
    console.error("Error updating orders:", err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at: ${PORT}`);
});
