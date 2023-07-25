import { Comment, ICommentService } from "../interface/comment.interface";
import { CommentRepository } from "../repository/comment.repository";

export class CommentService implements ICommentService {
  constructor(private commentRepository: CommentRepository) {}

  async create(
    text: string,
    userId: string,
    articleId: string
  ): Promise<Comment> {
    return await this.commentRepository.save(text, userId, articleId);
  }
}
