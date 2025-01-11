require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bulletinRoutes = require("./routes/bulletinRoutes");
const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

console.log('MongoDB URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the app if the DB connection fails
  });

// Routes
app.use("/auth", authRoutes); // Routes for authentication (signup/login)
app.use("/user", userRoutes); // Routes for user-specific actions
app.use("/bulletins", bulletinRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});