import { dbClient } from "../../internal/db/pg";
import { Content, IContentRepository } from "../interface/content.interface";

export class ContentRepository implements IContentRepository {
  async save(
    text: string,
    imgUlr: string,
    articleId: string
  ): Promise<Content> {
    try {
      const content = (
        await dbClient.query<Content>(
          `INSERT INTO content (text, "imgUrl", "articleId") VALUES ($1, $2, $3) RETURNING *`,
          [text, imgUlr, articleId]
        )
      ).rows[0];
      return content;
    } catch (error: any) {
      throw new Error(`${error.message}, "Error during save content"`);
    }
  }
}
