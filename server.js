// server.js
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
import { Sequelize } from "sequelize";

const app = express();
const port = process.env.PORT || 3002; // fallback if PORT isn't set
const host = process.env.HOST || "localhost";
const database = process.env.POSTGRES_DATABASE;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

// Middleware to parse JSON
app.use(express.json());

// Simple GET route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Example POST route
app.post("/data", (req, res) => {
  const { name } = req.body;
  res.send(`Received data for ${name}`);
});

async function connectToDatabase() {
  const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: "postgres",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
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
