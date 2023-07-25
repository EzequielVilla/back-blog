import express from "express";
import { CheckController } from "../../app/controller/check";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", CheckController.checkRoute);
router.get("/token", authMiddleware, CheckController.checkToken);

export default router;
