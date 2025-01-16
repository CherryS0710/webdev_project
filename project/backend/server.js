require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cghsRoutes = require("./routes/cghsRoutes");
const csdCanteenRoutes = require("./routes/csdCanteenRoutes");
const financeRoutes = require("./routes/financeRoutes");
const hrdRoutes = require("./routes/hrdRoutes");
const instrumentationRoutes = require("./routes/instrumentationRoutes");
const itGroupRoutes = require("./routes/itGroupRoutes");
const libraryRoutes = require("./routes/libraryRoutes");

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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
app.use("/admin", adminRoutes);
app.use("/cghs", cghsRoutes);
app.use("/csd-canteen", csdCanteenRoutes);
app.use("/finance", financeRoutes);
app.use("/hrd", hrdRoutes);
app.use("/instrumentation", instrumentationRoutes);
app.use("/it_group", itGroupRoutes);
app.use("/library", libraryRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
