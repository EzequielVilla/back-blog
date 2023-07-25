import { dbClient } from "../../internal/db/pg";
import { Article } from "../interface/article.interface";
import { Blog } from "../interface/blog.interface";
import { IUserRepository, User } from "../interface/user.interface";

export class UserRepository implements IUserRepository {
  async save(userName: string, authId: string): Promise<User> {
    try {
      const user = (
        await dbClient.query<User>(
          `INSERT INTO "user" ("userName", "authId") VALUES ('${userName}', '${authId}') RETURNING id, "createdAt", "updatedAt", "deletedAt", "userName", "authId"`
        )
      ).rows[0];
      return user;
    } catch (error: any) {
      throw new Error(error.message || "Error while saving user");
    }
  }
  async insertToken(token: string, authId: string): Promise<boolean> {
    try {
      await dbClient.query(
        `UPDATE "user" 
        SET "token" ='${token}'
        WHERE "user"."authId"='${authId}'
        `
      );
      return true;
    } catch (error: any) {
      throw new Error(error.message + "Error while inserting token");
    }
  }
  async findByToken(token: string): Promise<User> {
    try {
      const user = (
        await dbClient.query<User>(
          `SELECT * FROM "user" WHERE token='${token}' `
        )
      ).rows[0];
      return user;
    } catch (error: any) {
      throw new Error(error.message + "Error while finding user");
    }
  }
  async delete(id: string): Promise<void> {
    await dbClient.query(`DELETE FROM "user" WHERE id='${id}'`);
  }
  async findAllBlogs(
    userId: string
  ): Promise<{ blogs: Blog[]; count: number }> {
    const blogsFromDB = await dbClient.query<Blog>(
      `SELECT * FROM "blog" WHERE "userId"='${userId}'`
    );
    return {
      blogs: blogsFromDB.rows,
      count: blogsFromDB.rowCount,
    };
  }
  async getAllByBlog(
    blogId: string
  ): Promise<{ articles: Article[]; count: number }> {
    try {
      const articles = await dbClient.query(
        `SELECT * FROM article WHERE "blogId" = $1 ORDER BY id DESC`,
        [blogId]
      );
      return { articles: articles.rows, count: articles.rowCount };
    } catch (error: any) {
      throw new Error(
        `${error.message}, "Error during get all articles by blog"`
      );
    }
  }
}
