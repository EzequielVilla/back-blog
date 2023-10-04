import { dbClient } from "../../internal/db/pg";

process.env.NODE_ENV = "test";

beforeEach((done) => {
  //
  dbClient.query(`
    DELETE FROM "content";
    DELETE FROM "comment";
    DELETE FROM "article";
    DELETE FROM "blog";
    DELETE FROM "user";
    DELETE FROM "auth";
  `);
  done();
});

afterEach((done) => {
  dbClient.query(`
    DELETE FROM "content";
    DELETE FROM "comment";
    DELETE FROM "article";
    DELETE FROM "blog";
    DELETE FROM "user";
    DELETE FROM "auth";
  `);
  done();
  //
});
