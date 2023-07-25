import { dbClient } from "../../internal/db/pg";
import {
  Blog,
  BlogCategory,
  IBlogRepository,
} from "../interface/blog.interface";

export class BlogRepository implements IBlogRepository {
  async save(
    createBlogData: {
      name: string;
      category: BlogCategory;
      imgUrl: string;
      imgBase64?: string;
    },
    userId: string
  ): Promise<any> {
    try {
      const { name, category, imgUrl } = createBlogData;
      const blog = (
        await dbClient.query<Blog>(
          `INSERT INTO "blog" ("name", "category", "userId", "imgUrl") VALUES ('${name}', '${category}', '${userId}', ${imgUrl}) RETURNING id, "createdAt", "updatedAt", "deletedAt", "name", "category", "userId", "imgUrl"`
        )
      ).rows[0];
      return blog;
    } catch (error: any) {
      throw new Error(error.message || "Error while saving blog");
    }
  }
  async getAll(): Promise<{ blogs: Blog[]; count: number }> {
    const blogsFromDB = await dbClient.query<Blog>(`SELECT * FROM "blog"`);
    return {
      blogs: blogsFromDB.rows,
      count: blogsFromDB.rowCount,
    };
  }
  async getById(id: string): Promise<{ blog: Blog; count: number }> {
    try {
      const blogFromDB = await dbClient.query<any>(
        `SELECT JSONB_BUILD_OBJECT(
          'id', blog.id,
          'name', blog.name,
          'category', blog.category,
          'userId', blog."userId",
          'createdAt', blog."createdAt",
          'updatedAt', blog."updatedAt",
          'deletedAt', blog."deletedAt",
          'articles', JSONB_AGG
          (
              JSONB_BUILD_OBJECT
              (
                  'id', article.id,
                  'title', article.title,
                  'blogId', article."blogId",
                  'imgUrl', article."imgUrl",
                  'createdAt', article."createdAt",
                  'updatedAt', article."updatedAt",
                  'deletedAt', article."deletedAt"
                                
              )
          )
      ) AS blog
      FROM "blog" blog
      LEFT JOIN "article" article ON article."blogId" = blog.id
      WHERE blog.id = '${id}'
      GROUP BY blog.id
    
        `
      );
      // const count = (blog.rows[0].articles?.length);
      const blog = blogFromDB.rows[0].blog as Blog;
      // console.log(blog);

      // console.log({ length: blog });
      // const count = 1;
      const count = blog.articles!.length;
      return { blog, count };
    } catch (error: any) {
      throw new Error(`${error.message}, "Error during get blog by id"`);
    }
  }

  async getByIdAndUser(id: string, userId: string): Promise<Blog> {
    const blog = (
      await dbClient.query<Blog>(
        `SELECT "id" FROM "blog" WHERE id='${id}' AND "userId"='${userId}' `
      )
    ).rows[0];
    return blog;
  }
}
