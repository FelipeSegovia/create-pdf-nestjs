import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessPdfModule } from './process-pdf/process-pdf.module';

@Module({
  imports: [ProcessPdfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
