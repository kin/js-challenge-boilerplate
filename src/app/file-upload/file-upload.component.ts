import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-dropzone"
         [class.disabled]="disabled"
         (click)="!disabled && fileInput.click()"
         (dragover)="onDragOver($event)"
         (dragleave)="onDragLeave($event)"
         (drop)="onDrop($event)"
         tabindex="0"
         role="button"
         [attr.aria-disabled]="disabled"
    >
      <input #fileInput type="file" accept=".csv" (change)="onFileSelected($event)" hidden />
      <div class="upload-icon">📄</div>
      <div class="upload-message">Drag &amp; drop CSV file or click to browse</div>
    </div>
    <div *ngIf="errorMessage" class="upload-error">{{ errorMessage }}</div>
  `
})
export class FileUploadComponent {
  @Output() fileLoaded = new EventEmitter<string>();
  @Input() disabled = false;
  errorMessage: string | null = null;
  isDragOver = false;

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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (!this.disabled) this.isDragOver = true;
  }
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (this.disabled) return;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const fakeEvent = { target: { files } } as unknown as Event;
      this.onFileSelected(fakeEvent);
    }
  }
} 