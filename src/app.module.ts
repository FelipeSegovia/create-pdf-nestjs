import { Module } from '@nestjs/common';
import { ProcessPdfModule } from './process-pdf/process-pdf.module';

@Module({
  imports: [ProcessPdfModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
