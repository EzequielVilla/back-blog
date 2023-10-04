import { Request, Response } from "express";
import { BlogService } from "../service/blog.service";
import { RequestLogin } from "../../internal/middlewares/auth";
import { UserService } from "../service/user.service";
import { responseHandler } from "../../internal/lib/res/handler";

export class BlogController {
  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {}

  create = async (req: RequestLogin | Request, res: Response) => {
    try {
      const reqL = req as RequestLogin;
      const { name, category, imgBase64 } = req.body;
      const userId = reqL.user!.id;
      const createBlogData = { name, category, imgBase64 };
      const blogCreated = await this.blogService.create(createBlogData, userId);
      res
        .status(200)
        .json(responseHandler(true, "Blog created successfully", blogCreated));
    } catch (error: any) {
      console.error(error.message);
      res
        .status(400)
        .json(responseHandler(false, "Error during blog creation"));
    }
  };
  findAll = async (req: Request, res: Response) => {
    try {
      const blogs = await this.blogService.findAll();
      res.status(200).json(responseHandler(true, "Blogs found", blogs));
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json(responseHandler(false, "Error during blogs search"));
    }
  };
  findOne = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const blog = await this.blogService.findOne(id);
      res.status(200).json(responseHandler(true, "Blog found", blog));
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json(responseHandler(false, "Error during blog search"));
    }
  };
  findAllByUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const blogs = await this.userService.getAllByBlog(userId);
      res
        .status(200)
        .json(
          responseHandler(true, "Blogs founded by user successfully", blogs)
        );
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json(responseHandler(false, "Error during blogs search"));
    }
  };
}
