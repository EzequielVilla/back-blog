import { ArticleController } from "../../app/controller/article.controller";
import { AuthController } from "../../app/controller/auth.controller";
import { BlogController } from "../../app/controller/blog.controller";
import { CommentController } from "../../app/controller/comment.controller";
import { UserController } from "../../app/controller/user.controller";
import { ArticleRepository } from "../../app/repository/article.repository";
import { AuthRepository } from "../../app/repository/auth.repository";
import { AWSRepository } from "../../app/repository/aws.repository";
import { BlogRepository } from "../../app/repository/blog.repository";
import { CommentRepository } from "../../app/repository/comment.repository";
import { ContentRepository } from "../../app/repository/content.repository";
import { UserRepository } from "../../app/repository/user.repository";
import { ArticleService } from "../../app/service/article.service";
import { AuthService } from "../../app/service/auth.service";
import { AWSService } from "../../app/service/aws.service";
import { BlogService } from "../../app/service/blog.service";
import { CommentService } from "../../app/service/comment.service";
import { ContentService } from "../../app/service/content.service";
import { UserService } from "../../app/service/user.service";

function userProvider() {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  return { userRepository, userService, userController };
}
function authProvider() {
  const authRepository = new AuthRepository();
  const { userService } = userProvider();
  const authService = new AuthService(authRepository, userService);
  const authController = new AuthController(authService);
  return { authRepository, authService, authController };
}
function blogProvider() {
  const blogRepository = new BlogRepository();
  const blogService = new BlogService(blogRepository, awsProvider().awsService);
  const blogController = new BlogController(
    blogService,
    userProvider().userService
  );
  return { blogRepository, blogService, blogController };
}

function articleProvider() {
  const articleRepository = new ArticleRepository();
  const { contentService } = contentProvider();
  const { awsService } = awsProvider();
  const articleService = new ArticleService(
    articleRepository,
    contentService,
    awsService
  );
  const articleController = new ArticleController(
    articleService,
    userProvider().userService
  );
  return { articleRepository, articleService, articleController };
}
function contentProvider() {
  const contentRepository = new ContentRepository();
  const awsService = awsProvider().awsService;
  const contentService = new ContentService(contentRepository, awsService);
  // const contentController = new ContentController(contentService);
  // return { contentRepository, contentService, contentController };
  return { contentRepository, contentService };
}
function awsProvider() {
  const awsRepository = new AWSRepository();
  const awsService = new AWSService(awsRepository);
  return { awsRepository, awsService };
}
function commentProvider() {
  const commentRepository = new CommentRepository();
  const commentService = new CommentService(commentRepository);
  const commentController = new CommentController(commentService);
  return { commentRepository, commentService, commentController };
}
export {
  userProvider,
  authProvider,
  blogProvider,
  articleProvider,
  awsProvider,
  contentProvider,
  commentProvider,
};
