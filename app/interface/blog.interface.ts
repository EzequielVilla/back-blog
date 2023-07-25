import { IBase } from "./base.interface";

export type BlogCategory =
  | "c"
  | "c++"
  | "java"
  | "javascript"
  | "typescript"
  | "python"
  | "go"
  | "rust";

export interface Blog extends IBase {
  name: string;
  category: BlogCategory;
  userId: string;
  articles?: string[];
}
export interface IBlogRepository {
  save(
    createBlogData: { name: string; category: BlogCategory; imgUrl: string },
    userId: string
  ): Promise<Blog>;
  getAll(): Promise<{ blogs: Blog[]; count: number }>;
  getById(id: string): Promise<{ blog: Blog; count: number }>;
  getByIdAndUser(id: string, userId: string): Promise<Blog>;
  // *lo siguiente no recuerdo si fue implementado en user.
  // getAllByUser(userId: string): Promise<{ blogs: Blog[]; count: number }>;
  // getByIdAndUser(id: string, userId: string): Promise<Blog>;
}
export interface IBlogService {
  create(
    createBlogData: { name: string; category: BlogCategory; imgBase64: string },
    userId: string
  ): Promise<Blog>;
  findAll(): Promise<{ blogs: Blog[]; count: number }>;
  findOne(id: string): Promise<{ blog: Blog; count: number }>;
  checkBlogBelongToUser(blogId: string, userId: string): Promise<boolean>;
  // findOneByUser(id: string, userId: string): Promise<Blog>;
}
