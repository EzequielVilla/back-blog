import { Request, Response } from "express";
import { dbClient } from "../../internal/db/pg";
import { responseHandler } from "../../internal/lib/res/handler";
import { OnlyArticle } from "../interface/article.interface";
import { ContentPreSave } from "../interface/content.interface";
import { ArticleService } from "../service/article.service";
import { UserService } from "../service/user.service";

export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private userService: UserService
  ) {}
  create = async (req: Request, res: Response) => {
    try {
      const { title, blogId, text, imgBase64, img: articleImg } = req.body;
      const articleData: OnlyArticle = { title, blogId, img: articleImg };
      const contentData: ContentPreSave = { text, imgBase64 };
      dbClient.query("BEGIN");
      const { article, content } = await this.articleService.create(
        articleData,
        contentData
      );
      dbClient.query("COMMIT");
      res.status(201).json(
        responseHandler(true, "Article created successfully", {
          article,
          content,
        })
      );
    } catch (error: any) {
      dbClient.query("ROLLBACK");

      console.error(error.message);
      res
        .status(400)
        .json(responseHandler(false, "Error during article creation"));
    }
  };
  getAll = async (req: Request, res: Response) => {
    try {
      const articles = await this.articleService.getAll();
      res.status(200).json(responseHandler(true, "Articles found", articles));
    } catch (error: any) {
      console.error(error.message);
      res
        .status(400)
        .json(responseHandler(false, "Error during articles search"));
    }
  };
  getOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const article = await this.articleService.getById(id);
      res.status(200).json(responseHandler(true, "Article found", article));
    } catch (error: any) {
      console.error(error.message);
      res
        .status(400)
        .json(responseHandler(false, "Error during article search"));
    }
  };
  getAllByBlog = async (req: Request, res: Response) => {
    try {
      const { blogId } = req.params;
      const articles = await this.userService.getAllByBlog(blogId);
      res.status(200).json(responseHandler(true, "Articles found", articles));
    } catch (error: any) {
      console.error(error.message);
      res
        .status(400)
        .json(responseHandler(false, "Error during articles search"));
    }
  };
}
