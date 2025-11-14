import { Module } from '@nestjs/common';
import { ProcessPdfService } from './process-pdf.service';
import { ProcessPdfController } from './process-pdf.controller';
import { PdfService } from 'src/common/pdf.service';

@Module({
  controllers: [ProcessPdfController],
  providers: [ProcessPdfService, PdfService],
})
export class ProcessPdfModule {}
