import { Auth, IAuthService } from "../interface/auth.interface";
import { AuthRepository } from "../repository/auth.repository";
import { hashPassword } from "../../internal/lib/hashPassword";

import { dbClient } from "../../internal/db/pg";
import { UserService } from "./user.service";

export class AuthService implements IAuthService {
  constructor(
    private authRepository: AuthRepository,
    private userService: UserService
  ) {}

  async signUp(
    email: string,
    password: string,
    userName: string
  ): Promise<Auth> {
    const crypedPass = hashPassword(password);
    try {
      await dbClient.query("BEGIN");
      const auth = await this.authRepository.save(email, crypedPass);
      const user = await this.userService.register(userName, auth.id);
      auth.user = user;
      await dbClient.query("COMMIT");
      return auth;
    } catch (error) {
      await dbClient.query("ROLLBACK");
      throw error;
    }
  }
  async login(email: string, password: string): Promise<string> {
    const crypedPass = hashPassword(password);
    const user = await this.authRepository.findByEmailAndPass(
      email,
      crypedPass
    );
    const token = this.userService.login(user);
    return token;
  }
  async delete(id: string): Promise<void> {
    this.authRepository.delete(id);
  }
}
