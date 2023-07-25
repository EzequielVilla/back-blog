import { Article } from "./article.interface";
import { IBase } from "./base.interface";
import { Blog } from "./blog.interface";

export interface User extends IBase {
  userName: string;
  token: string;
  authId: string;
  blogs?: string[];
}
export type UserKeys =
  | "userName"
  | "token"
  | "authId"
  | "id"
  | "createdAt"
  | "updatedAt"
  | "deletedAt";
export interface IUserRepository {
  save(userName: string, authId: string): Promise<User>;
  insertToken(token: string, authId: string): Promise<boolean>;
  findByToken(token: string): Promise<User>;
  delete(id: string): Promise<void>;
  // update
  findAllBlogs(userId: string): Promise<{ blogs: Blog[]; count: number }>;
  getAllByBlog(blogId: string): Promise<{ articles: Article[]; count: number }>;
}
export interface IUserService {
  register(userName: string, authId: string): Promise<User>;
  login(user: User): Promise<string>;
  getDataByToken(token: string): Promise<User>;
  //changeInformation
  findAllBlogs(userId: string): Promise<{ blogs: Blog[]; count: number }>;
  getAllByBlog(blogId: string): Promise<{ articles: Article[]; count: number }>;
}
