import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export type PolicyResult = 'VALID' | 'ERROR' | 'INVALID';

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
  tableData: { policyNumber: string; result: PolicyResult }[] = [];
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

  parseCsv(csv: string): { policyNumber: string; result: PolicyResult }[] {
    return csv
      .split(',')
      .map((policyNumber) => {
        const trimmed = policyNumber.trim();
        if (!/^\d{9}$/.test(trimmed)) {
          return { policyNumber: trimmed, result: 'INVALID' };
        }
        return {
          policyNumber: trimmed,
          result: this.isValidPolicyNumber(trimmed) ? 'VALID' : 'ERROR'
        };
      });
  }

  isValidPolicyNumber(policy: string): boolean {
    // Assumes already checked for 9 digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (i + 1) * Number(policy[8 - i]); // d1 is rightmost
    }
    return sum % 11 === 0;
  }

  get hasValidPolicy(): boolean {
    return this.tableData.some(row => row.result === 'VALID');
  }

  submitPolicies() {
    this.isSubmitting = true;
    this.postResult = null;
    // Only submit valid and error policies (not invalid)
    const payload = this.tableData
      .filter(row => row.result === 'VALID' || row.result === 'ERROR')
      .map(row => ({ policyNumber: row.policyNumber, isValid: row.result === 'VALID' }));
    this.http.post<{ id: number }>('https://jsonplaceholder.typicode.com/posts', payload)
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
}
