import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-csv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss'],
})
export class UploadCsvComponent {
  selectedFile: File | null = null;
  error: string | null = null;
  policyNumbers: string[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.error = 'Only CSV files are allowed';
      this.selectedFile = null;
      this.policyNumbers = [];
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.error = 'File must be less than 2 MB';
      this.selectedFile = null;
      this.policyNumbers = [];
      return;
    }

    this.selectedFile = file;
    this.error = null;

    const reader = new FileReader();
    reader.onload = () => {
      const text = (reader.result as string) || '';
      this.policyNumbers = text
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    };
    reader.onerror = () => {
      this.error = 'Failed to read file.';
      this.selectedFile = null;
      this.policyNumbers = [];
    };

    reader.readAsText(file); // ← the missing call
  }
}
