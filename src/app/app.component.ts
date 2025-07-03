import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kin-ocr';
  csvContent: string | null = null;
  tableData: { id: number; policyNumber: string }[] = [];

  constructor(private http: HttpClient) {
    // For debugging: load sample.csv on init
    this.http.get('/sample.csv', { responseType: 'text' }).subscribe(content => {
      this.onFileLoaded(content);
    });
  }

  onFileLoaded(content: string) {
    this.csvContent = content;
    this.tableData = this.parseCsv(content);
  }

  parseCsv(csv: string): { id: number; policyNumber: string }[] {
    // Simple parser: split by comma, assign IDs
    return csv
      .split(',')
      .map((policyNumber, idx) => ({
        id: idx + 1,
        policyNumber: policyNumber.trim()
      }));
  }
}
