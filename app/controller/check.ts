import { Request, Response } from "express";

export class CheckController {
  static checkRoute(req: Request, res: Response) {
    res.status(200).json({ message: "Health Check" });
  }
  static checkToken(req: Request, res: Response) {
    res.status(200).json({ message: "Token is valid" });
  }
}
