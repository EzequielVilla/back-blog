import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { articleMiddleware } from "../middlewares/article";
import { articleProvider } from "../provider";

const router = express.Router();
const articleController = articleProvider().articleController;

router.post("/", authMiddleware, articleMiddleware, articleController.create);

router.get("/", articleController.getAll);
router.get("/id/:id", articleController.getOne);

router.get("/blog/:blogId", articleController.getAllByBlog);

export default router;
