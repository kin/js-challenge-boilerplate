import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyUploadComponent } from './policy-upload.component';
import { CsvParserService } from '../shared-services/csv-parser.service';
import { By } from '@angular/platform-browser';

describe('PolicyUploadComponent', () => {
  let component: PolicyUploadComponent;
  let fixture: ComponentFixture<PolicyUploadComponent>;
  let csvParser: jasmine.SpyObj<CsvParserService>;

  beforeEach(async () => {
    const parserSpy = jasmine.createSpyObj('CsvParserService', [
      'validateFile',
      'parseFile',
    ]);

    await TestBed.configureTestingModule({
      imports: [PolicyUploadComponent],
      providers: [{ provide: CsvParserService, useValue: parserSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyUploadComponent);
    component = fixture.componentInstance;
    csvParser = TestBed.inject(
      CsvParserService,
    ) as jasmine.SpyObj<CsvParserService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the upload drop zone', () => {
    const dropZone = fixture.debugElement.query(By.css('.drop-zone'));
    expect(dropZone).toBeTruthy();
  });

  it('should render the hidden file input that accepts .csv', () => {
    const input = fixture.debugElement.query(By.css('input[type="file"]'));
    expect(input).toBeTruthy();
    expect(input.nativeElement.accept).toBe('.csv');
  });

  it('should not show the results table initially', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeNull();
  });

  it('should not show an error message initially', () => {
    const alert = fixture.debugElement.query(By.css('.alert'));
    expect(alert).toBeNull();
  });

  describe('handleFile – validation error', () => {
    it('displays the error message when validateFile returns an error', async () => {
      csvParser.validateFile.and.returnValue(
        'Invalid file type. Please upload a .csv file.',
      );

      const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
      await component.handleFile(file);
      fixture.detectChanges();

      const alert = fixture.debugElement.query(By.css('.alert--error'));
      expect(alert).toBeTruthy();
      expect(alert.nativeElement.textContent).toContain('Invalid file type');
    });

    it('does not display the results table when there is a validation error', async () => {
      csvParser.validateFile.and.returnValue('File too large');

      await component.handleFile(
        new File(['dummy'], 'big.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('table'))).toBeNull();
    });
  });

  describe('handleFile – successful parse', () => {
    it('populates the policy numbers and shows the table', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.resolveTo(['111', '222', '333']);

      await component.handleFile(
        new File(['111,222,333'], 'policies.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(3);
    });

    it('displays each policy number in its own row', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.resolveTo(['457500000', '664371495']);

      await component.handleFile(
        new File(['...'], 'policies.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      const cells = fixture.debugElement.queryAll(By.css('.policy-number'));
      expect(cells[0].nativeElement.textContent.trim()).toBe('457500000');
      expect(cells[1].nativeElement.textContent.trim()).toBe('664371495');
    });

    it('shows the file name in the drop zone after a successful load', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.resolveTo(['111']);

      await component.handleFile(
        new File(['111'], 'my-policies.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      const dropZone = fixture.debugElement.query(By.css('.drop-zone'));
      expect(dropZone.nativeElement.textContent).toContain('my-policies.csv');
    });

    it('shows no error when parse succeeds', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.resolveTo(['111']);

      await component.handleFile(
        new File(['111'], 'ok.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.alert'))).toBeNull();
    });

    it('shows the badge with the correct count', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.resolveTo(['1', '2', '3', '4', '5']);

      await component.handleFile(
        new File(['...'], 'p.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.badge'));
      expect(badge.nativeElement.textContent.trim()).toBe('5');
    });
  });

  describe('handleFile – empty result', () => {
    it('shows an error when the file contains no policy numbers', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.resolveTo([]);

      await component.handleFile(
        new File([''], 'empty.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      const alert = fixture.debugElement.query(By.css('.alert--error'));
      expect(alert).toBeTruthy();
      expect(alert.nativeElement.textContent).toContain(
        'No policy numbers found',
      );
    });
  });

  describe('handleFile – parse failure', () => {
    it('shows an error when parseFile rejects', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.rejectWith(new Error('read error'));

      await component.handleFile(
        new File(['...'], 'bad.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      const alert = fixture.debugElement.query(By.css('.alert--error'));
      expect(alert).toBeTruthy();
    });
  });

  describe('clearFile', () => {
    it('clears policy numbers, error, and file name', async () => {
      csvParser.validateFile.and.returnValue(null);
      csvParser.parseFile.and.resolveTo(['111', '222']);

      await component.handleFile(
        new File(['111,222'], 'p.csv', { type: 'text/csv' }),
      );
      fixture.detectChanges();

      component.clearFile();
      fixture.detectChanges();

      expect(component.policyNumbers).toEqual([]);
      expect(component.errorMessage).toBe('');
      expect(component.fileName).toBe('');
      expect(fixture.debugElement.query(By.css('table'))).toBeNull();
    });
  });

  describe('drag and drop', () => {
    it('adds dragging class when dragover fires', () => {
      const dropZone = fixture.debugElement.query(By.css('.drop-zone'));
      const dragEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
      });
      dropZone.nativeElement.dispatchEvent(dragEvent);
      fixture.detectChanges();

      expect(component.isDragging).toBeTrue();
      expect(dropZone.nativeElement.classList).toContain('drop-zone--dragging');
    });

    it('removes dragging class when dragleave fires', () => {
      component.isDragging = true;
      fixture.detectChanges();

      const dropZone = fixture.debugElement.query(By.css('.drop-zone'));
      const leaveEvent = new DragEvent('dragleave', {
        bubbles: true,
        cancelable: true,
      });
      dropZone.nativeElement.dispatchEvent(leaveEvent);
      fixture.detectChanges();

      expect(component.isDragging).toBeFalse();
    });
  });
});
