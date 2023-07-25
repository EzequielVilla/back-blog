import express from "express";
import { blogProvider } from "../provider";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
const blogController = blogProvider().blogController;

//? owner
router.post("/", authMiddleware, blogController.create);

//?
router.get("/", blogController.findAll);
router.get("/id/:id", blogController.findOne);

router.get("/user/:userId", blogController.findAllByUser);

export default router;
