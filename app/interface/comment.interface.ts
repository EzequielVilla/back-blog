import { Article } from "./article.interface";
import { IBase } from "./base.interface";
import { User } from "./user.interface";

export interface Comment extends IBase {
  id: string;
  text: string;
  userId: string;
  articleId: string;
  user?: User;
  article?: Article;
}

export interface ICommentRepository {
  save(text: string, userId: string, articleId: string): Promise<Comment>;
}

export interface ICommentService {
  create(text: string, userId: string, articleId: string): Promise<Comment>;
}
//
