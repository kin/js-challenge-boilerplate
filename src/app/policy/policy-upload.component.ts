import { Component } from '@angular/core';
import { CsvParserService } from '../shared-services/csv-parser.service';
import { FileUploadComponent } from '../shared-components/file-upload/file-upload.component';
import { ButtonComponent } from '../shared-components/button/button.component';
import { AlertComponent } from '../shared-components/alert/alert.component';
import { SectionCardComponent } from '../shared-components/section-card/section-card.component';
import { SectionHeadingComponent } from '../shared-components/section-heading/section-heading.component';
import { BadgeComponent } from '../shared-components/badge/badge.component';
import { DataTableComponent } from '../shared-components/data-table/data-table.component';

@Component({
  selector: 'app-policy-upload',
  standalone: true,
  imports: [
    FileUploadComponent,
    ButtonComponent,
    AlertComponent,
    SectionCardComponent,
    SectionHeadingComponent,
    BadgeComponent,
    DataTableComponent,
  ],
  templateUrl: './policy-upload.component.html',
  styleUrl: './policy-upload.component.scss',
})
export class PolicyUploadComponent {
  policyNumbers: string[] = [];
  errorMessage = '';
  fileName = '';
  isLoading = false;

  constructor(private csvParser: CsvParserService) {}

  async handleFile(file: File): Promise<void> {
    this.errorMessage = '';
    this.policyNumbers = [];
    this.fileName = '';

    const validationError = this.csvParser.validateFile(file);
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }

    this.isLoading = true;
    this.fileName = file.name;

    try {
      this.policyNumbers = await this.csvParser.parseFile(file);
      if (this.policyNumbers.length === 0) {
        this.errorMessage = 'No policy numbers found in the uploaded file.';
        this.fileName = '';
      }
    } catch {
      this.errorMessage = 'Failed to read the file. Please try again.';
      this.fileName = '';
    } finally {
      this.isLoading = false;
    }
  }

  clearFile(): void {
    this.policyNumbers = [];
    this.errorMessage = '';
    this.fileName = '';
  }
}
