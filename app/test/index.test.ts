import { dbClient } from "../../internal/db/pg";

process.env.NODE_ENV = "test";

beforeEach(async () => {
  await dbClient.query("BEGIN");
  dbClient.query(
    `
    DELETE FROM "content";
    DELETE FROM "comment";
    DELETE FROM "article";
    DELETE FROM "blog";
    DELETE FROM "user";
    DELETE FROM "auth";
  `
  );
});

afterEach(async () => {
  // Rollback the transaction to undo any changes made during the test
  await dbClient.query("ROLLBACK");
  console.log("ROLLBACK");
});
