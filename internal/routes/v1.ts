import express from "express";
import check from "./check";
import Auth from "./auth";
import User from "./user";
import Blog from "./blog";
import Article from "./article";
import Comment from "./comment";
const router = express.Router();

router.use("/check", check);
router.use("/auth", Auth);
router.use("/user", User);
router.use("/blog", Blog);
router.use("/article", Article);
router.use("/comment", Comment);

export default router;
