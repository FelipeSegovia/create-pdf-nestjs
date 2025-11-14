import { Module } from '@nestjs/common';
import { ProcessPdfService } from './process-pdf.service';
import { ProcessPdfController } from './process-pdf.controller';

@Module({
  controllers: [ProcessPdfController],
  providers: [ProcessPdfService],
})
export class ProcessPdfModule {}
