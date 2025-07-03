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
  tableData: { policyNumber: number; isValid: boolean }[] = [];
  postResult: { success: boolean; id?: number; error?: string } | null = null;
  isSubmitting = false;

  constructor(private http: HttpClient) {
    // For debugging: load sample.csv on init
    this.http.get('/sample.csv', { responseType: 'text' }).subscribe(content => {
      this.onFileLoaded(content);
    });
  }

  onFileLoaded(content: string) {
    this.csvContent = content;
    this.tableData = this.parseCsv(content);
    this.postResult = null; // Reset result on new upload
  }

  parseCsv(csv: string): { policyNumber: number; isValid: boolean }[] {
    return csv
      .split(',')
      .map((policyNumber) => {
        const trimmed = policyNumber.trim();
        const num = Number(trimmed);
        return {
          policyNumber: num,
          isValid: this.isValidPolicyNumber(trimmed)
        };
      });
  }

  isValidPolicyNumber(policy: string): boolean {
    if (!/^\d{9}$/.test(policy)) return false; // Must be exactly 9 digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (i + 1) * Number(policy[8 - i]); // d1 is rightmost
    }
    return sum % 11 === 0;
  }

  submitPolicies() {
    this.isSubmitting = true;
    this.postResult = null;
    this.http.post<{ id: number }>('https://jsonplaceholder.typicode.com/posts', this.tableData)
      .subscribe({
        next: (res) => {
          this.postResult = { success: true, id: res.id };
          this.isSubmitting = false;
        },
        error: (err) => {
          this.postResult = { success: false, error: 'Failed to submit policies.' };
          this.isSubmitting = false;
        }
      });
  }

  get hasValidPolicy(): boolean {
    return this.tableData.some(row => row.isValid);
  }
}
