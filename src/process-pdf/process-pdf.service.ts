import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';

@Injectable()
export class ProcessPdfService {
  private readonly templatePath: string;
  private browser: puppeteer.Browser;

  constructor() {
    this.templatePath = path.join(__dirname, '../templates/basic-template.hbs');
  }
}
