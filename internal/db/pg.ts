import { Client } from "pg";

const dbClient = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  ssl: false,
});
dbClient.on("error", (err) => {
  console.error("Error en la conexión de la base de datos:", err);
});

dbClient.connect();
export { dbClient };
