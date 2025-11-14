import { Injectable } from '@nestjs/common';
import { PdfService } from 'src/common/pdf.service';

@Injectable()
export class ProcessPdfService {
  constructor(private readonly pdfService: PdfService) {}

  async generatePdfFromTemplate(data: any): Promise<Buffer> {
    return await this.pdfService.generateBasicPDF('basic-template', data);
  }
}
