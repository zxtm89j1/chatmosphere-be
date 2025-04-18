// server.js
// import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";

import bcrypt from "bcrypt";
import User from "./models/User.js";
import sequelize from "./config/database.js";
import authRoutes from "./routes/authRoutes.js"; // Adjust the path as necessary

const app = express();
const port = process.env.PORT || 3002; // fallback if PORT isn't set

// Middleware to parse JSON
app.use(express.json());

// Simple GET route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/auth", authRoutes);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: false }); // Sync models with the database
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function start() {
  try {
    await connectToDatabase();
    // Start server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

await start();
