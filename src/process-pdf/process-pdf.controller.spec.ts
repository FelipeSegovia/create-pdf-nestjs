import { Test, TestingModule } from '@nestjs/testing';
import { ProcessPdfController } from './process-pdf.controller';
import { ProcessPdfService } from './process-pdf.service';

describe('ProcessPdfController', () => {
  let controller: ProcessPdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessPdfController],
      providers: [ProcessPdfService],
    }).compile();

    controller = module.get<ProcessPdfController>(ProcessPdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
