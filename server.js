const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load env variables first

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
const connectedDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ DB Connected Successfully!");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error.message);
    process.exit(1);
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("🚀 PrintX Backend is running!");
});

// Start server
connectedDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server Running on Port ${PORT}`);
  });
});
