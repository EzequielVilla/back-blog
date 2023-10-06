import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

let testing = process.env.NODE_ENV === "test";

const dbClient = new Client({
  user: testing ? process.env.POSTGRES_USER_TEST : process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: testing ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  ssl: false,
});
dbClient.on("error", (err) => {
  console.error("Error en la conexión de la base de datos:", err);
});

dbClient.connect();
export { dbClient };
