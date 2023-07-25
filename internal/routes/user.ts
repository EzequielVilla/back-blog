import express from "express";
import { authMiddleware } from "../middlewares/auth";

import { userProvider } from "../provider";
import { articleMiddleware } from "../middlewares/article";

const router = express.Router();
const userController = userProvider().userController;

// Obtener todos los blogs
router.get("/blog", authMiddleware, userController.getAllByUser);

// Obtener todos los articulos con un blog.
router.get(
  "/blog/articles",
  authMiddleware,
  articleMiddleware,
  userController.getAllByBlog
);

export default router;
