import { Controller } from '@nestjs/common';
import { ProcessPdfService } from './process-pdf.service';

@Controller('process-pdf')
export class ProcessPdfController {
  constructor(private readonly processPdfService: ProcessPdfService) {}
}
