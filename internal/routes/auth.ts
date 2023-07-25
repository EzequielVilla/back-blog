import express from "express";
import { authProvider } from "../provider";

const router = express.Router();
const authController = authProvider().authController;

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);

export default router;
