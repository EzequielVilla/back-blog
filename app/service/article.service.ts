import {
  Article,
  IArticleService,
  OnlyArticle,
} from "../interface/article.interface";
import { Content, ContentPreSave } from "../interface/content.interface";
import { ArticleRepository } from "../repository/article.repository";
import { AWSService } from "./aws.service";
import { ContentService } from "./content.service";

export class ArticleService implements IArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private contentService: ContentService,
    private awsService: AWSService
  ) {}
  async create(
    articleData: OnlyArticle,
    contentData: ContentPreSave
  ): Promise<{ article: Article; content: Content }> {
    const { title, blogId, img } = articleData;
    const { text, imgBase64 } = contentData;
    const articleImgUrl = await this.awsService.upload(img, "image");
    const article = await this.articleRepository.save(
      title,
      blogId,
      articleImgUrl
    );
    const content = await this.contentService.create(
      text,
      imgBase64,
      article.id
    );
    return { article, content };
  }

  async getAll(): Promise<{ articles: Article[]; count: number }> {
    return await this.articleRepository.getAll();
  }
  // Obtenerlo por id significa que hizo click y que se quiere ver tambien el contenido
  async getById(id: string): Promise<Article> {
    const articleWithContent = await this.articleRepository.getById(id);
    return articleWithContent;
  }
}
