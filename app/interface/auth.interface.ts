import { IBase } from "./base.interface";
import { User } from "./user.interface";

export interface Auth extends IBase {
  email: string;
  password: string;
  user: User;
}
export interface IAuthRepository {
  save(email: string, password: string): Promise<Auth>;
  findByEmailAndPass(email: string, password: string): Promise<User>;
  delete(id: string): Promise<void>;
}

export interface IAuthService {
  signUp(email: string, password: string, userName: string): Promise<Auth>;
  login(email: string, password: string): Promise<string>;
  delete(id: string): Promise<void>;
}
