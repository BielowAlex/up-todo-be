import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateImageFilePipe implements PipeTransform {
  constructor(
    private readonly options: { fileIsRequired: boolean } = {
      fileIsRequired: true,
    },
  ) {}

  transform(file: Express.Multer.File) {
    if (this.options.fileIsRequired && !file) {
      throw new BadRequestException('File is required');
    }

    if (file && !this.isImage(file.mimetype)) {
      throw new BadRequestException(
        'Unsupported file type. Please upload a photo.',
      );
    }

    return file;
  }

  private isImage(mimeType: string): boolean {
    const supportedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/svg+xml',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/webp',
    ];
    return supportedTypes.includes(mimeType);
  }
}
