import { IBase } from "./base.interface";

export interface Content extends IBase {
  text: string;
  imgUlr: string;
  articleId: string;
}
export interface ContentPreSave {
  text: string;
  imgBase64: string;
}
export interface IContentRepository {
  save(text: string, imgUlr: string, articleId: string): Promise<Content>;
}

export interface IContentService {
  create(text: string, imgBase64: string, articleId: string): Promise<Content>;
}
