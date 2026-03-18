import { CsvParserService, MAX_FILE_SIZE_BYTES } from './csv-parser.service';

describe('CsvParserService', () => {
  let service: CsvParserService;

  beforeEach(() => {
    service = new CsvParserService();
  });

  // --- validateFile ---

  describe('validateFile', () => {
    it('returns null for a valid CSV file under 2 MB', () => {
      const file = new File(['1,2,3'], 'policies.csv', { type: 'text/csv' });
      expect(service.validateFile(file)).toBeNull();
    });

    it('returns an error when the file extension is not .csv', () => {
      const file = new File(['1,2,3'], 'policies.txt', { type: 'text/plain' });
      expect(service.validateFile(file)).toContain('Invalid file type');
    });

    it('returns an error when the file extension is .CSV (case insensitive)', () => {
      // Upper-case extension should still be caught
      const file = new File(['1,2,3'], 'POLICIES.XLSX', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      expect(service.validateFile(file)).toContain('Invalid file type');
    });

    it('returns null for a file whose size equals exactly 2 MB', () => {
      const content = 'a'.repeat(MAX_FILE_SIZE_BYTES);
      const file = new File([content], 'policies.csv', { type: 'text/csv' });
      expect(service.validateFile(file)).toBeNull();
    });

    it('returns an error when the file exceeds 2 MB', () => {
      const content = 'a'.repeat(MAX_FILE_SIZE_BYTES + 1);
      const file = new File([content], 'policies.csv', { type: 'text/csv' });
      const error = service.validateFile(file);
      expect(error).toContain('2 MB limit');
    });

    it('includes the actual file size in the error message when too large', () => {
      const content = 'a'.repeat(MAX_FILE_SIZE_BYTES + 1024 * 512); // 2.5 MB
      const file = new File([content], 'big.csv', { type: 'text/csv' });
      const error = service.validateFile(file);
      expect(error).toBeTruthy();
      expect(error!).toMatch(/MB/);
    });
  });

  // --- parseCsvText ---

  describe('parseCsvText', () => {
    it('parses a single-row CSV into an array of strings', () => {
      const result = service.parseCsvText('111,222,333');
      expect(result).toEqual(['111', '222', '333']);
    });

    it('parses a multi-row CSV, flattening all values', () => {
      const result = service.parseCsvText('111,222\n333,444');
      expect(result).toEqual(['111', '222', '333', '444']);
    });

    it('trims whitespace from each cell', () => {
      const result = service.parseCsvText('  111 , 222  , 333  ');
      expect(result).toEqual(['111', '222', '333']);
    });

    it('filters out empty cells', () => {
      const result = service.parseCsvText('111,,333\n\n444');
      expect(result).toEqual(['111', '333', '444']);
    });

    it('handles Windows-style line endings (CRLF)', () => {
      const result = service.parseCsvText('111,222\r\n333,444');
      expect(result).toEqual(['111', '222', '333', '444']);
    });

    it('returns an empty array for an empty string', () => {
      expect(service.parseCsvText('')).toEqual([]);
    });

    it('returns an empty array for whitespace-only input', () => {
      expect(service.parseCsvText('   \n   ')).toEqual([]);
    });

    it('parses the sample.csv format correctly', () => {
      const csv =
        '457500000,664371495,333333333,45750800,555555555,666666666,777777777,861100036,861100036,123456789';
      const result = service.parseCsvText(csv);
      expect(result.length).toBe(10);
      expect(result[0]).toBe('457500000');
      expect(result[9]).toBe('123456789');
    });
  });

  // --- parseFile ---

  describe('parseFile', () => {
    it('resolves with policy numbers for a valid file', async () => {
      const file = new File(['111,222,333'], 'policies.csv', {
        type: 'text/csv',
      });
      const result = await service.parseFile(file);
      expect(result).toEqual(['111', '222', '333']);
    });

    it('resolves with an empty array for an empty file', async () => {
      const file = new File([''], 'empty.csv', { type: 'text/csv' });
      const result = await service.parseFile(file);
      expect(result).toEqual([]);
    });
  });
});
