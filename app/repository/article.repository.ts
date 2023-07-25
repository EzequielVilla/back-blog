import { dbClient } from "../../internal/db/pg";
import { Article, IArticleRepository } from "../interface/article.interface";

export class ArticleRepository implements IArticleRepository {
  async save(title: string, blogId: string, img: string): Promise<Article> {
    try {
      const article = (
        await dbClient.query<Article>(
          `INSERT INTO article (title, "blogId", "imgUrl" ) VALUES ($1, $2, $3) RETURNING *`,
          [title, blogId, img]
        )
      ).rows[0];
      return article;
    } catch (error: any) {
      throw new Error(`${error.message}, "Error during save article"`);
    }
  }
  async getAll(): Promise<{ articles: Article[]; count: number }> {
    try {
      const articles = await dbClient.query<Article>(
        `SELECT * FROM article ORDER BY id DESC`
      );
      return { articles: articles.rows, count: articles.rowCount };
    } catch (error: any) {
      throw new Error(`${error.message}, "Error during get all articles"`);
    }
  }
  async getById(id: string): Promise<Article> {
    try {
      const articleWithContent = (
        await dbClient.query<{ article: Article }>(
          `SELECT JSONB_BUILD_OBJECT(
              'id', article.id,
              'title', article.title,
              'blogId', article."blogId",
              'imgUrl', article."imgUrl",
              'createdAt', article."createdAt",
              'updatedAt', article."updatedAt",
              'deletedAt', article."deletedAt",
              'content', JSONB_BUILD_OBJECT(
                  'id', content.id,
                  'text', content.text,
                  'imgUrl', content."imgUrl",
                  'articleId', content."articleId",
                  'createdAt', content."createdAt",
                  'updatedAt', content."updatedAt",
                  'deletedAt', content."deletedAt"
              ),
              'comments', JSONB_AGG(
                  JSONB_BUILD_OBJECT(
                      'id', comment.id,
                      'text', comment.text,
                      'userId', comment."userId",
                      'articleId', comment."articleId",
                      'createdAt', comment."createdAt",
                      'updatedAt', comment."updatedAt"
                  )
              )
          ) AS article
          FROM article 
          JOIN "comment" ON "comment"."articleId" = article.id
          JOIN "content" ON "content"."articleId" = article.id
          WHERE article.id = $1
          GROUP BY article.id, content.id`,
          [id]
        )
      ).rows[0].article;
      return articleWithContent;
    } catch (error: any) {
      console.log({ error });

      throw new Error(`${error.message}, "Error during get article by id"`);
    }
  }
}
