import { IBase } from "./base.interface";
import { Content, ContentPreSave } from "./content.interface";

export interface Article extends IBase {
  title: string;
  img: string;
  blogId: string;
  content?: Content[];
}
export type OnlyArticle = Omit<Article, keyof IBase>;
export interface IArticleRepository {
  save(title: string, blogId: string, img: string): Promise<Article>;
  getAll(): Promise<{ articles: Article[]; count: number }>;
  getById(id: string): Promise<Article>;
}

export interface IArticleService {
  create(
    article: OnlyArticle,
    content: ContentPreSave
  ): Promise<{ article: Article; content: Content }>;
  getAll(): Promise<{ articles: Article[]; count: number }>;
  getById(id: string): Promise<Article>;
}
