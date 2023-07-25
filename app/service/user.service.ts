import { JWT } from "../../internal/lib/jwt";
import { Article } from "../interface/article.interface";
import { Blog } from "../interface/blog.interface";
import { IUserService, User } from "../interface/user.interface";
import { UserRepository } from "../repository/user.repository";

export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async register(userName: string, authId: string): Promise<User> {
    return await this.userRepository.save(userName, authId);
  }

  async login(user: User): Promise<string> {
    const token = JWT.createToken(user);
    const inserted = await this.userRepository.insertToken(token, user.authId);
    if (inserted) return token;
    else throw new Error("Error while inserting token");
  }
  // no tiene ninguna implementacion, por ahora solo sirve para el test.
  async getDataByToken(token: string): Promise<User> {
    return await this.userRepository.findByToken(token);
  }
  async delete(id: string): Promise<void> {
    this.userRepository.delete(id);
  }
  async findAllBlogs(
    userId: string
  ): Promise<{ blogs: Blog[]; count: number }> {
    return await this.userRepository.findAllBlogs(userId);
  }
  // Es un vistazo general por cada blog, donde tenga el titulo y
  async getAllByBlog(
    blogId: string
  ): Promise<{ articles: Article[]; count: number }> {
    return await this.userRepository.getAllByBlog(blogId);
  }
}
