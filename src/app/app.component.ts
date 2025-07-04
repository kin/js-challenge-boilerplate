import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type PolicyResult = 'VALID' | 'ERROR' | 'INVALID';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FileUploadComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kin-ocr';
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;
  csvContent: string | null = null;
  tableData: { policyNumber: string; result: PolicyResult; isDuplicate: boolean }[] = [];
  postResult: { success: boolean; id?: number; error?: string } | null = null;
  isSubmitting = false;
  sortColumn = 'id';
  sortDirection = 'asc';
  searchTerm: string = '';

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

  parseCsv(csv: string): { policyNumber: string; result: PolicyResult; isDuplicate: boolean }[] {
    const numbers = csv.split(',').map(pn => pn.trim());
    const counts: Record<string, number> = {};
    numbers.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
    });
    return numbers.map((policyNumber) => {
      let result: PolicyResult;
      if (!/^\d{9}$/.test(policyNumber)) {
        result = 'INVALID';
      } else {
        result = this.isValidPolicyNumber(policyNumber) ? 'VALID' : 'ERROR';
      }
      return {
        policyNumber,
        result,
        isDuplicate: counts[policyNumber] > 1
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

  get hasDuplicatePolicy(): boolean {
    return this.tableData.some(row => row.isDuplicate);
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

  get sortedTableData() {
    const data = this.tableData.map((row, idx) => ({ ...row, id: idx + 1 }));
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    return data.sort((a, b) => {
      if (this.sortColumn === 'id') {
        return dir * (a.id - b.id);
      } else if (this.sortColumn === 'policyNumber') {
        return dir * (a.policyNumber.localeCompare(b.policyNumber));
      } else if (this.sortColumn === 'result') {
        return dir * (a.result.localeCompare(b.result));
      }
      return 0;
    });
  }

  get filteredTableData() {
    if (!this.searchTerm.trim()) {
      return this.sortedTableData;
    }
    return this.sortedTableData.filter(row => 
      row.policyNumber.includes(this.searchTerm.trim())
    );
  }

  get hasSearchResults(): boolean {
    return this.filteredTableData.length > 0;
  }

  get filteredValidCount(): number {
    return this.filteredTableData.filter(row => row.result === 'VALID').length;
  }

  get filteredErrorCount(): number {
    return this.filteredTableData.filter(row => row.result === 'ERROR').length;
  }

  get filteredInvalidCount(): number {
    return this.filteredTableData.filter(row => row.result === 'INVALID').length;
  }

  get filteredDuplicateCount(): number {
    return new Set(this.filteredTableData.filter(row => row.isDuplicate).map(row => row.policyNumber)).size;
  }

  get displayTotalCount(): number {
    return this.searchTerm ? this.filteredTableData.length : this.totalPolicies;
  }

  get displayTotalPercentage(): string {
    if (this.searchTerm) {
      return ((this.filteredTableData.length / this.totalPolicies) * 100).toFixed(1);
    }
    return '100.0';
  }

  get displayValidCount(): number {
    return this.searchTerm ? this.filteredValidCount : this.totalValid;
  }

  get displayValidPercentage(): string {
    if (this.searchTerm) {
      return this.filteredTableData.length > 0 ? ((this.filteredValidCount / this.filteredTableData.length) * 100).toFixed(1) : '0.0';
    }
    return ((this.totalValid / this.totalPolicies) * 100).toFixed(1);
  }

  get displayErrorCount(): number {
    return this.searchTerm ? this.filteredErrorCount : this.totalError;
  }

  get displayErrorPercentage(): string {
    if (this.searchTerm) {
      return this.filteredTableData.length > 0 ? ((this.filteredErrorCount / this.filteredTableData.length) * 100).toFixed(1) : '0.0';
    }
    return ((this.totalError / this.totalPolicies) * 100).toFixed(1);
  }

  get displayInvalidCount(): number {
    return this.searchTerm ? this.filteredInvalidCount : this.totalInvalid;
  }

  get displayInvalidPercentage(): string {
    if (this.searchTerm) {
      return this.filteredTableData.length > 0 ? ((this.filteredInvalidCount / this.filteredTableData.length) * 100).toFixed(1) : '0.0';
    }
    return ((this.totalInvalid / this.totalPolicies) * 100).toFixed(1);
  }

  get displayDuplicateCount(): number {
    return this.searchTerm ? this.filteredDuplicateCount : this.totalDuplicates;
  }

  get displayDuplicatePercentage(): string {
    if (this.searchTerm) {
      return this.filteredTableData.length > 0 ? ((this.filteredDuplicateCount / this.filteredTableData.length) * 100).toFixed(1) : '0.0';
    }
    return ((this.totalDuplicates / this.totalPolicies) * 100).toFixed(1);
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  setSort(column: 'id' | 'policyNumber' | 'result') {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  reset() {
    this.csvContent = null;
    this.tableData = [];
    this.postResult = null;
    this.isSubmitting = false;
    this.sortColumn = 'id';
    this.sortDirection = 'asc';
    this.searchTerm = '';
    // Clear the file input to allow re-uploading the same file
    if (this.fileUploadComponent) {
      this.fileUploadComponent.clearFileInput();
    }
  }

  get totalPolicies() {
    return this.tableData.length;
  }
  get totalValid() {
    return this.tableData.filter(row => row.result === 'VALID').length;
  }
  get totalError() {
    return this.tableData.filter(row => row.result === 'ERROR').length;
  }
  get totalInvalid() {
    return this.tableData.filter(row => row.result === 'INVALID').length;
  }
  get totalDuplicates() {
    // Count unique policy numbers that are duplicates
    const dups = new Set(this.tableData.filter(row => row.isDuplicate).map(row => row.policyNumber));
    return dups.size;
  }
}
