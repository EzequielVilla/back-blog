import { NextFunction, Response, Request } from "express";
import { RequestLogin } from "./auth";
import { blogProvider } from "../provider";

export async function articleMiddleware(
  req: RequestLogin | Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reqL = req as RequestLogin;
    const userId = reqL.user!.id;
    const blogId = req.body.blogId || req.params.blogId;
    if (!blogId) return res.status(400).json({ message: "BlogId is required" });
    const blogBelongToUser =
      await blogProvider().blogService.checkBlogBelongToUser(blogId, userId);
    if (!blogBelongToUser)
      return res.status(403).json({ message: "Blog does not belong to user" });
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message + "in article middleware" });
  }
}
