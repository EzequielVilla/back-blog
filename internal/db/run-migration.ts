import fs from "fs";
import path from "path";
import { dbClient } from "./pg";
import dotenv from "dotenv";

export async function runMigration() {
  dotenv.config();
  const migrationDir = path.join(__dirname, "./../migrations");
  const migrationFiles = fs.readdirSync(migrationDir);
  for (const fileName of migrationFiles) {
    const filePath = path.join(migrationDir, fileName);
    const sql = fs.readFileSync(filePath, "utf-8");

    try {
      await executeMigration(sql, fileName);
      console.log(`Migration executed successfully: ${fileName}`);
      continue;
    } catch (err) {
      console.error(`Error executing migration: ${fileName}`);
      console.error(err);
      // Handle the error as needed
    }
  }

  return;
  // fs.readdirSync(migrationDir).forEach(async (fileName) => {
  //   const filePath = path.join(migrationDir, fileName);
  //   const sql = fs.readFileSync(filePath, "utf-8");
  //   try {
  //     await executeMigration(sql, fileName);
  //     console.log(`Migration executed successfully: ${fileName}`);
  //   } catch (err) {
  //     console.error(`Error executing migration: ${fileName}`);
  //     console.error(err);
  //     // Handle the error as needed
  //   }
  // dbClient.query(sql, (err, result) => {
  //   if (err) {
  //     console.error(`Error executing migration: ${fileName}`);
  //     console.error(err);
  //   } else {
  //     console.log(`Migration executed successfully: ${fileName}`);
  //   }
  // });
  // });
}
function executeMigration(sql: string, fileName: string) {
  return new Promise((resolve, reject) => {
    dbClient.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
