import { Body, Controller, Get, Res } from '@nestjs/common';
import { ProcessPdfService } from './process-pdf.service';
import { type Response } from 'express';

type PdfStructure = {
  title: string;
  description: string;
};

@Controller('process-pdf')
export class ProcessPdfController {
  constructor(private readonly processPdfService: ProcessPdfService) {}

  @Get('basic')
  async generateBasicPdf(@Body() data: PdfStructure, @Res() res: Response) {
    const pdf = await this.processPdfService.generatePdfFromTemplate(data);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=generated.pdf',
      'Content-Length': pdf.length,
    });

    res.end(pdf);
  }
}
