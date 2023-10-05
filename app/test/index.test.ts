import { dbClient } from "../../internal/db/pg";

process.env.NODE_ENV = "test";

beforeEach((done) => {
  dbClient.query(
    `
    DELETE FROM "content";
    DELETE FROM "comment";
    DELETE FROM "article";
    DELETE FROM "blog";
    DELETE FROM "user";
    DELETE FROM "auth";
  `,
    (error, result) => {
      if (error) {
        // Handle the error appropriately
        console.error("Error in beforeEach:", error);
      }
      console.log("DONE");
      // Signal that the cleanup is complete
      done();
    }
  );
});

afterEach((done) => {
  dbClient.query(
    `
    DELETE FROM "content";
    DELETE FROM "comment";
    DELETE FROM "article";
    DELETE FROM "blog";
    DELETE FROM "user";
    DELETE FROM "auth";
  `,
    (error, result) => {
      if (error) {
        // Handle the error appropriately
        console.error("Error in afterEach:", error);
      }
      console.log("DONE");

      // Signal that the cleanup is complete
      done();
    }
  );
});
