const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); 
const UserRoutes = require("./controllers/UserRoutes");
const ShopKeeperRoutes = require("./controllers/ShopKeeperRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const connectedDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected Successfully!");
  } catch (error) {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("🚀 PrintX Backend is running!");
});
app.use("/printx/user", UserRoutes);
app.use("/printx/shopkeeper", ShopKeeperRoutes);

// Start server
connectedDb().then(() => {
  app.listen(PORT, () => {
    console.log(` Server Running on Port ${PORT}`);
  });
});
