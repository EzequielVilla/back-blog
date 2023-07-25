import { s3 } from "../../internal/lib/aws/s3";
import { IAWSRepository } from "../interface/aws.interface";
import { randomUUID } from "crypto";

export class AWSRepository implements IAWSRepository {
  async uploadImage(file: string): Promise<string> {
    const name = randomUUID();
    const buffer = Buffer.from(file, "base64");
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME_IMG!,
      Key: name,
      Body: buffer,
      ContentType: "image/jpeg",
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        throw new Error(`${err.message}, failed saving in aws`);
      } else {
        console.log({ data });
      }
    });

    const imgUrl = `https://${process.env.AWS_BUCKET_NAME_IMG}.s3.amazonaws.com/${name}`;
    return imgUrl;
  }
}
