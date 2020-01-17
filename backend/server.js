const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

// Load .env file
require("dotenv").config({ path: "./config/config.env" });

const app = express();

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
