// config/database.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.HOST || "localhost";
const database = process.env.POSTGRES_DATABASE;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
  timezone: "+00:00",
});

export default sequelize;
