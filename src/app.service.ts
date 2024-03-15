import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { S3 } from 'aws-sdk';

@Injectable()
export class AppService {
  async generateUploadUrl() {
    const s3 = this.getS3();
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;
    return await s3.getSignedUrlPromise('putObject', {
      Bucket: 'blogging-website-tnam',
      Key: imageName,
      Expires: 1000,
      ContentType: 'image/jpeg',
    });
  }

  getS3() {
    return new S3({
      region: 'ap-northeast-3',
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
