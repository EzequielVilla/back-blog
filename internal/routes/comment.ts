import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { commentProvider } from "../provider";

const router = express.Router();
const commentController = commentProvider().commentController;

router.post("/:articleId", authMiddleware, commentController.create);

export default router;
