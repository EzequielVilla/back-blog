import { Response, Request } from "express";
import { RequestLogin } from "../../internal/middlewares/auth";
import { CommentService } from "../service/comment.service";
import { responseHandler } from "../../internal/lib/res/handler";

export class CommentController {
  constructor(private commentService: CommentService) {}

  create = async (req: RequestLogin | Request, res: Response) => {
    try {
      const reqL = req as RequestLogin;
      const { articleId } = req.params;
      const { text } = req.body;
      const userId = reqL.user!.id;
      console.log({ articleId, text, userId });

      const comment = await this.commentService.create(text, userId, articleId);
      res.status(201).json(responseHandler(true, "Comment created", comment));
    } catch (error: any) {
      console.error(error.message);
      res
        .status(400)
        .json(responseHandler(false, "Error during comment creation"));
    }
  };
}
