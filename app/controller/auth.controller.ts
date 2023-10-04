import { Request, Response, response } from "express";
import { IAuthService } from "../interface/auth.interface";
import { responseHandler } from "../../internal/lib/res/handler";
import { AuthService } from "../service/auth.service";

export class AuthController {
  constructor(private authService: AuthService) {}

  signUp = async (req: Request, res: Response) => {
    try {
      const { email, password, userName } = req.body;
      await this.authService.signUp(email, password, userName);
      res.status(201).json(responseHandler(true, "User created successfully"));
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json(responseHandler(false, "Error during sign up"));
    }
    console.log("esto es nuevo");
  };
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json(responseHandler(true, "Login successfully", token));
    } catch (error: any) {
      console.error(error.message);
      res.status(400).json(responseHandler(false, "Error during login"));
    }
  };
}
