import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label>
      <input #fileInput type="file" accept=".csv" (change)="onFileSelected($event)" hidden />
      <button type="button" (click)="fileInput.click()">Upload CSV</button>
    </label>
    <div *ngIf="errorMessage" style="color: red; margin-top: 0.5rem;">{{ errorMessage }}</div>
  `
})
export class FileUploadComponent {
  @Output() fileLoaded = new EventEmitter<string>();
  errorMessage: string | null = null;

  onFileSelected(event: Event): void {
    this.errorMessage = null;
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    // Validate file type
    const isCsv = file.name.toLowerCase().endsWith('.csv');
    if (!isCsv) {
      this.errorMessage = 'Only CSV files are allowed.';
      return;
    }
    // Validate file size (<= 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      this.errorMessage = 'File size must be 2MB or less.';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.fileLoaded.emit(reader.result as string);
    };
    reader.readAsText(file);
  }
} 