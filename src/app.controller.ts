import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/get-upload-url')
  getImgUploadUrl(@Req() req: Request, @Res() res: Response) {
    this.appService
      .generateUploadUrl()
      .then((url) => {
        return res.status(200).json({ uploadUrl: url });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      });
  }
}
