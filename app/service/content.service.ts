import { IAWSService } from "../interface/aws.interface";
import { Content, IContentService } from "../interface/content.interface";
import { ContentRepository } from "../repository/content.repository";
import { AWSService } from "./aws.service";

export class ContentService implements IContentService {
  constructor(
    private contentRepository: ContentRepository,
    private awsService: AWSService
  ) {}
  async create(
    text: string,
    imgBase64: string,
    articleId: string
  ): Promise<Content> {
    const imgUrl = await this.awsService.upload(imgBase64, "image");
    const content = await this.contentRepository.save(text, imgUrl, articleId);
    return content;
  }
}
