import { responseHandler } from "../../internal/lib/res/handler";
import { RequestLogin } from "../../internal/middlewares/auth";
import { UserService } from "../service/user.service";
import { Response } from "express";
export class UserController {
  constructor(private userService: UserService) {}
  getAllByUser = async (req: RequestLogin, res: Response) => {
    try {
      const userId = req.user!.id;
      const blogs = await this.userService.findAllBlogs(userId);
      res
        .status(201)
        .json(
          responseHandler(true, "Blogs founded by user successfully", blogs)
        );
    } catch (error: any) {
      console.log(error.message);
      res.status(400).json(responseHandler(false, "Error during blogs search"));
    }
  };
  getAllByBlog = async (req: RequestLogin, res: Response) => {
    try {
      const { blogId } = req.body;
      const articles = await this.userService.getAllByBlog(blogId);
      res.status(200).json(responseHandler(true, "Articles found", articles));
    } catch (error: any) {
      console.log(error.message);
      res
        .status(400)
        .json(responseHandler(false, "Error during articles search"));
    }
  };
}
