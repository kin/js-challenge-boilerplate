import { TestBed, ComponentFixture } from '@angular/core/testing';
import { UploadFormComponent } from './upload-form.component';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

function makeChangeEvent(file: File): Event {
  const input = document.createElement('input');
  Object.defineProperty(input, 'files', { value: [file] });
  const event = new Event('change');
  Object.defineProperty(event, 'target', { value: input });
  return event;
}

// Needed for checking drag and drop
function makeDragEvent(file: File): DragEvent {
  const event = new DragEvent('drop');
  Object.defineProperty(event, 'dataTransfer', {
    value: { files: [file] },
  });
  spyOn(event, 'preventDefault');
  return event;
}

function makeFile(name: string, content: string, type = 'text/csv'): File {
  return new File([content], name, { type });
}

describe('UploadFormComponent', () => {
  let fixture: ComponentFixture<UploadFormComponent>;
  let component: UploadFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /* --- onFileSelected --- */

  describe('onFileSelected', () => {
    it('accepts a valid CSV file under the size limit', () => {
      const file = makeFile('valid.csv', '123,456,789');
      component.onFileSelected(makeChangeEvent(file));

      expect(component.selectedFile).toBe(file);
      expect(component.errorMessage).toBeNull();
    });

    it('rejects a file exceeding 2 MB and sets an error message', () => {
      const oversizedContent = 'x'.repeat(MAX_FILE_SIZE + 1);
      const file = makeFile('big.csv', oversizedContent);
      component.onFileSelected(makeChangeEvent(file));

      expect(component.selectedFile).toBeNull();
      expect(component.errorMessage).toBe(
        'File size exceeds the limit of 2 MB.',
      );
    });

    it('rejects a non-CSV file and sets an error message', () => {
      const file = makeFile('document.pdf', 'content', 'application/pdf');
      component.onFileSelected(makeChangeEvent(file));

      expect(component.selectedFile).toBeNull();
      expect(component.errorMessage).toBe('Only CSV files are allowed.');
    });
  });

  /* --- drag/drop events --- */

  describe('drag/drop events', () => {
    it('sets isDragging to true on dragover', () => {
      const event = new DragEvent('dragover');
      spyOn(event, 'preventDefault');
      component.onDragOver(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.isDragging).toBe(true);
    });

    it('sets isDragging to false on dragleave', () => {
      component.isDragging = true;
      component.onDragLeave();

      expect(component.isDragging).toBe(false);
    });

    it('accepts a valid CSV file dropped onto the zone', () => {
      const file = makeFile('dropped.csv', '111,222,333');
      const event = makeDragEvent(file);
      component.onDrop(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.isDragging).toBe(false);
      expect(component.selectedFile).toBe(file);
      expect(component.errorMessage).toBeNull();
    });

    it('rejects an oversized file dropped onto the zone', () => {
      const oversizedContent = 'x'.repeat(MAX_FILE_SIZE + 1);
      const file = makeFile('big.csv', oversizedContent);
      component.onDrop(makeDragEvent(file));

      expect(component.selectedFile).toBeNull();
      expect(component.errorMessage).toBe(
        'File size exceeds the limit of 2 MB.',
      );
    });

    it('rejects a non-CSV file dropped onto the zone', () => {
      const file = makeFile('image.png', 'data', 'image/png');
      component.onDrop(makeDragEvent(file));

      expect(component.selectedFile).toBeNull();
      expect(component.errorMessage).toBe('Only CSV files are allowed.');
    });

    it('clears isDragging after a drop regardless of validity', () => {
      component.isDragging = true;
      const file = makeFile('bad.txt', 'data', 'text/plain');
      component.onDrop(makeDragEvent(file));

      expect(component.isDragging).toBe(false);
    });
  });

  /* --- parseCSV --- */

  describe('parseCSV', () => {
    it('emits trimmed, non-empty values split by comma', (done) => {
      const csvContent = '457500000, 664371495, 333333333';
      const file = makeFile('sample.csv', csvContent);

      const mockReader = {
        onload: null as ((e: ProgressEvent<FileReader>) => void) | null,
        readAsText: jasmine.createSpy('readAsText').and.callFake(function (
          this: typeof mockReader,
        ) {
          this.onload?.({
            target: { result: csvContent },
          } as ProgressEvent<FileReader>);
        }),
      };
      spyOn(window, 'FileReader').and.returnValue(
        mockReader as unknown as FileReader,
      );

      component.csvParsed.subscribe((rows: string[]) => {
        expect(rows).toEqual(['457500000', '664371495', '333333333']);
        done();
      });

      component.onFileSelected(makeChangeEvent(file));
    });
  });

  /* --- onSubmit --- */

  describe('onSubmit', () => {
    it('logs the file name when a file is selected', () => {
      spyOn(console, 'log');
      component.selectedFile = makeFile('policies.csv', '123');
      component.onSubmit();

      expect(console.log).toHaveBeenCalledWith(
        'Uploading file:',
        'policies.csv',
      );
    });

    it('does not log when no file is selected', () => {
      spyOn(console, 'log');
      component.selectedFile = null;
      component.onSubmit();

      expect(console.log).not.toHaveBeenCalled();
    });
  });

  /* --- HTML --- */

  describe('Component HTML', () => {
    it('renders a form element', () => {
      const form = fixture.nativeElement.querySelector('form');
      expect(form).toBeTruthy();
    });

    it('renders the "OCR File Upload" label', () => {
      const label = fixture.nativeElement.querySelector(
        'label.upload-form__label',
      );
      expect(label?.textContent?.trim()).toBe('OCR File Upload');
    });

    it('renders a file input linked to the label', () => {
      const input = fixture.nativeElement.querySelector('input#fileUpload');
      expect(input).toBeTruthy();
      expect(input.type).toBe('file');
    });

    it('renders the drop zone', () => {
      const dropZone = fixture.nativeElement.querySelector(
        '.upload-form__drop-zone',
      );
      expect(dropZone).toBeTruthy();
    });

    it('shows the browse button label in the drop zone', () => {
      const button = fixture.nativeElement.querySelector(
        'label.upload-form__drop-zone-button',
      );
      expect(button).toBeTruthy();
      expect(button.getAttribute('for')).toBe('fileUpload');
    });

    it('applies the active class to the drop zone while dragging', () => {
      component.isDragging = true;
      fixture.detectChanges();

      const dropZone = fixture.nativeElement.querySelector(
        '.upload-form__drop-zone',
      );
      expect(
        dropZone.classList.contains('upload-form__drop-zone--active'),
      ).toBe(true);
    });

    it('shows the file name in the drop zone text after a file is selected', () => {
      component.selectedFile = makeFile('my-policies.csv', '123');
      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector(
        '.upload-form__drop-zone-text',
      );
      expect(text?.textContent?.trim()).toBe('my-policies.csv');
    });

    it('does not show an error message by default', () => {
      const error = fixture.nativeElement.querySelector('.upload-form__error');
      expect(error).toBeNull();
    });

    it('shows an error message when errorMessage is set', () => {
      component.errorMessage = 'File size exceeds the limit of 2 MB.';
      fixture.detectChanges();

      const error = fixture.nativeElement.querySelector('.upload-form__error');
      expect(error?.textContent?.trim()).toBe(
        'File size exceeds the limit of 2 MB.',
      );
    });
  });
});
