import fs from "fs";
import path from "path";
import { dbClient } from "./pg";

export function runMigration() {
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
}
