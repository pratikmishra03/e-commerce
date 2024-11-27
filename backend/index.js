const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

// Express Application
const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);


// Connect to Mongo Database 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for Request
    app.listen(process.env.PORT, () => {
      console.log("Conneted to DB & Listening on Port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });
