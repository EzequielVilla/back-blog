import fs from "fs";
import path from "path";
import { dbClient } from "./pg";
import dotenv from "dotenv";

export function runMigration() {
  dotenv.config();
  const migrationDir = path.join(__dirname, "./../migrations");
  fs.readdirSync(migrationDir).forEach((fileName) => {
    const filePath = path.join(migrationDir, fileName);
    const sql = fs.readFileSync(filePath, "utf-8");

    dbClient.query(sql, (err, result) => {
      if (err) {
        console.error(`Error executing migration: ${fileName}`);
        console.error(err);
      } else {
        console.log(`Migration executed successfully: ${fileName}`);
      }
    });
  });
  process.on("exit", (code) => {
    console.log(`Script exiting with code: ${code}`);
    // Perform any cleanup or finalization tasks here, if needed
    // This code will run when the script is about to exit
  });
  // Terminate the process explicitly
  process.exit(); // This will exit the script
}
