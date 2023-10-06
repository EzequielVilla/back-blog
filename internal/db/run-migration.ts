import fs from "fs";
import path from "path";
import { dbClient } from "./pg";
import dotenv from "dotenv";

export async function runMigration() {
  dotenv.config();
  const migrationDir = path.join(__dirname, "./../migrations");
  const files = fs.readdirSync(migrationDir);
  const promises: Promise<boolean>[] = [];
  for (const fileName of files) {
    const filePath = path.join(migrationDir, fileName);
    const sql = fs.readFileSync(filePath, "utf-8");
    const migrationPromise = new Promise<boolean>((resolve) => {
      dbClient.query(sql, (err, result) => {
        if (err) {
          console.error(`Error executing migration: ${fileName}`);
          console.error(err);
          resolve(false);
        } else {
          console.log(`Migration executed successfully: ${fileName}`);
          resolve(true);
        }
      });
    });
    promises.push(migrationPromise);
  }
  const migratedResults = await Promise.all(promises);
  if (files.length === migratedResults.length) {
    process.on("exit", (code) => {
      console.log(`Script exiting with code: ${code}`);
    });

    process.exit();
  }
}

// function executeMig() {}
