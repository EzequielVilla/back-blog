import { Blog, BlogCategory, IBlogService } from "../interface/blog.interface";
import { BlogRepository } from "../repository/blog.repository";
import { AWSService } from "./aws.service";

export class BlogService implements IBlogService {
  constructor(
    private blogRepository: BlogRepository,
    private awsService: AWSService
  ) {}
  async create(
    createBlogData: {
      name: string;
      category: BlogCategory;
      imgBase64?: string;
    },
    userId: string
  ): Promise<Blog> {
    const { imgBase64, category, name } = createBlogData;
    const imgUrl = await this.awsService.upload(imgBase64, "image");
    const saveData = { category, name, imgUrl };

    return this.blogRepository.save(saveData, userId);
  }

  async findAll(): Promise<{ blogs: Blog[]; count: number }> {
    return await this.blogRepository.getAll();
  }
  async findOne(id: string): Promise<{ blog: Blog; count: number }> {
    return await this.blogRepository.getById(id);
  }

  async checkBlogBelongToUser(
    blogId: string,
    userId: string
  ): Promise<boolean> {
    const blog = await this.blogRepository.getByIdAndUser(blogId, userId);
    return !!blog;
  }
}
