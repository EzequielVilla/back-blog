import { FileToAws, IAWSService } from "../interface/aws.interface";
import { AWSRepository } from "../repository/aws.repository";

export class AWSService implements IAWSService {
  constructor(private awsRepository: AWSRepository) {}

  async upload(file: any, fileType: FileToAws): Promise<string> {
    if (fileType === "image") {
      const imgUlr = await this.awsRepository.uploadImage(file);
      return imgUlr;
    } else {
      throw new Error("File type not supported");
    }
    // con file type voy a distinguir a que tipo de repositorio llamar
  }
}
