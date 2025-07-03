import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'kin-ocr' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('kin-ocr');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, Kin OCR'
    );
  });

  it('should parse valid, error, and invalid policy numbers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const csv = '123456789,abcdefghi,457508000,123456788';
    const result = app.parseCsv(csv);
    expect(result[0].result).toBe('VALID'); // 123456789 passes checksum
    expect(result[1].result).toBe('INVALID'); // not digits
    expect(result[2].result).toBe('VALID'); // 457508000 passes checksum
    expect(result[3].result).toBe('ERROR'); // 123456788 fails checksum
  });

  it('should detect duplicates', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const csv = '457508000,457508000,123456789';
    const result = app.parseCsv(csv);
    expect(result[0].isDuplicate).toBeTrue();
    expect(result[1].isDuplicate).toBeTrue();
    expect(result[2].isDuplicate).toBeFalse();
  });

  it('should validate policy number checksum', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isValidPolicyNumber('457508000')).toBeTrue();
    expect(app.isValidPolicyNumber('123456789')).toBeTrue();
  });

  it('should render table with parsed data', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const csv = '457500000,664371495,333333333,45750800,555555555,666666666,777777777,861100036,861100036,123456789';
    app.tableData = app.parseCsv(csv);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const fileDetailsTable = compiled.querySelector('[data-testid="file-details-table"]') as HTMLTableElement;
    expect(fileDetailsTable.querySelectorAll('tbody tr').length).toBe(10);
    expect(fileDetailsTable.textContent).toContain('457500000');
    expect(fileDetailsTable.textContent).toContain('123456789');
  });
});
