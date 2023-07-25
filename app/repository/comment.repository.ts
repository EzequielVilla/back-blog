import { dbClient } from "../../internal/db/pg";
import { Comment, ICommentRepository } from "../interface/comment.interface";

export class CommentRepository implements ICommentRepository {
  async save(
    text: string,
    userId: string,
    articleId: string
  ): Promise<Comment> {
    try {
      const comment = (
        await dbClient.query(
          `INSERT INTO "comment" ("text", "userId", "articleId") VALUES ('${text}', '${userId}', '${articleId}') RETURNING id, "createdAt", "updatedAt", "deletedAt", "text", "userId", "articleId"`
        )
      ).rows[0];

      return comment;
    } catch (error: any) {
      throw new Error(`${error.message}, "Error while saving comment"`);
    }
  }
}
