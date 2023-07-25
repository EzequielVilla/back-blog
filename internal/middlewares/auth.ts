import { Response, Request, NextFunction } from "express";
import parseBearerToken from "parse-bearer-token";
import { JWT } from "../lib/jwt";
import { User } from "../../app/interface/user.interface";

export interface RequestLogin extends Request {
  user?: User;
}

export function authMiddleware(
  req: RequestLogin,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined {
  try {
    const token = parseBearerToken(req);
    if (!token) return res.status(401).json({ message: "No token in header" });
    const decoded = JWT.decodeToken(token);

    if (!decoded) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error(error.message);
    res.status(401).json({ message: "Error while authenticating" });
  }
}
