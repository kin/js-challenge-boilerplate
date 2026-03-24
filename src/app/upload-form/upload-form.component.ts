import { Component, EventEmitter, Output } from '@angular/core';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB (1 MB = 1024 * 1024 bytes)

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.scss',
  standalone: true
})
export class UploadFormComponent {
  selectedFile: File | null = null;
  errorMessage: string | null = null;

  @Output() csvParsed = new EventEmitter<string[]>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size <= MAX_FILE_SIZE) {
        this.selectedFile = file;
        this.errorMessage = null;
        this.parseCSV(file);
      } else {
        this.selectedFile = null;
        this.errorMessage = 'File size exceeds the limit of 2 MB.';
      }
    }
  }

  private parseCSV(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split(',').map(r => r.trim()).filter(r => r.length > 0);
      this.csvParsed.emit(rows);
    };
    reader.readAsText(file);
  }

  onSubmit(): void {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
    }
  }
}
