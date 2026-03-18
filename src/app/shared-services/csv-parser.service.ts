import { Injectable } from '@angular/core';

export const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const VALID_EXTENSION = '.csv';

@Injectable({ providedIn: 'root' })
export class CsvParserService {
  /**
   * Validates a File before parsing.
   * Returns an error message string, or null if the file is valid.
   */
  validateFile(file: File): string | null {
    if (!file.name.toLowerCase().endsWith(VALID_EXTENSION)) {
      return 'Invalid file type. Please upload a .csv file.';
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      return `File size (${sizeMb} MB) exceeds the 2 MB limit.`;
    }
    return null;
  }

  /**
   * Reads a File and resolves with an array of policy number strings.
   */
  parseFile(file: File): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(this.parseCsvText(text));
      };
      reader.onerror = () => reject(new Error('Failed to read the file.'));
      reader.readAsText(file);
    });
  }

  /**
   * Pure CSV parse: splits on newlines then commas, trims whitespace,
   * and filters empty tokens. Handles both single-row and multi-row CSVs.
   */
  parseCsvText(text: string): string[] {
    return text
      .split(/\r?\n/)
      .flatMap((row) => row.split(','))
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0);
  }
}
