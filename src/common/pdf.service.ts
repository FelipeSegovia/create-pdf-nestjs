import { Injectable, NotFoundException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs'; // librería para manejar el sistema de archivos
import Handlebars from 'handlebars';
@Injectable()
export class PdfService {
  private readonly templatePath: string;
  private browser: puppeteer.Browser;

  constructor() {
    this.templatePath = path.join(__dirname, '../templates');
    this.registerHelpers();
  }

  async generateBasicPDF(
    templateName: string,
    data: any,
    options?: puppeteer.PDFOptions,
  ): Promise<Buffer> {
    try {
      const html = this.compileTemplate(templateName, data);
      return await this.htmlToPDF(html, options);
    } catch (error) {
      throw new Error('Error generating PDF: ' + error);
    }
  }

  /**
   * Esta función compila una plantilla Handlebars con los datos proporcionados.
   */
  private compileTemplate(templateName: string, data: any): string {
    const templatePath = path.join(this.templatePath, `${templateName}.hbs`);
    if (!fs.existsSync(templatePath)) {
      throw new NotFoundException(`Template ${templateName} not found`);
    }

    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);

    return template(data);
  }

  /**
   * Esta función convierte HTML a PDF usando Puppeteer.
   */
  private async htmlToPDF(
    html: string,
    options?: puppeteer.PDFOptions,
  ): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: options?.margin || {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
      ...options,
    });

    await browser.close();
    return Buffer.from(pdfBuffer);
  }

  /**
   * Obtiene o crea una instancia del navegador
   */
  private async getBrowser(): Promise<puppeteer.Browser> {
    if (!this.browser || !this.browser.connected) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
        ],
      });
    }
    return this.browser;
  }

  /**
   * Registra helpers personalizados de Handlebars
   */
  private registerHelpers(): void {
    // Helper para formatear moneda chilena
    Handlebars.registerHelper('formatCurrency', (value: number) => {
      return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
      }).format(value);
    });

    // Helper para formatear fechas
    Handlebars.registerHelper('formatDate', (date: Date) => {
      return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date));
    });

    // Helper para formato RUT
    Handlebars.registerHelper('formatRut', (rut: string) => {
      const clean = rut.replace(/[^0-9kK]/g, '');
      const body = clean.slice(0, -1);
      const dv = clean.slice(-1);
      return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
    });

    // Helper condicional
    Handlebars.registerHelper('eq', (a, b) => a === b);
  }
}
