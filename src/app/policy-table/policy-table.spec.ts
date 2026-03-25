import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PolicyTableComponent } from './policy-table.component';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

describe('PolicyTableComponent', () => {
  let fixture: ComponentFixture<PolicyTableComponent>;
  let component: PolicyTableComponent;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyTableComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyTableComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpTesting.verify());

  describe('ngOnChanges', () => {
    it('maps input strings to processedPolicies with policyNumber and isValid', () => {
      component.policies = ['123456789', '664371495'];
      component.ngOnChanges();

      expect(component.processedPolicies).toEqual([
        { policyNumber: 123456789, isValid: true },
        { policyNumber: 664371495, isValid: false },
      ]);
    });

    it('resets submissionStatus to idle', () => {
      component.submissionStatus = 'success';
      component.policies = ['123456789'];
      component.ngOnChanges();

      expect(component.submissionStatus).toBe('idle');
    });

    it('resets submissionId to null', () => {
      component.submissionId = 42;
      component.policies = ['123456789'];
      component.ngOnChanges();

      expect(component.submissionId).toBeNull();
    });

    it('produces an empty processedPolicies array when given no policies', () => {
      component.policies = [];
      component.ngOnChanges();

      expect(component.processedPolicies).toEqual([]);
    });
  });

  /* --- isValid (tested via processedPolicies) --- */

  describe('isValid', () => {
    it('returns true for 123456789', () => {
      component.policies = ['123456789'];
      component.ngOnChanges();

      expect(component.processedPolicies[0].isValid).toBeTrue();
    });

    it('returns true for 457508000', () => {
      component.policies = ['457508000'];
      component.ngOnChanges();

      expect(component.processedPolicies[0].isValid).toBeTrue();
    });

    it('returns false for 664371495', () => {
      component.policies = ['664371495'];
      component.ngOnChanges();

      expect(component.processedPolicies[0].isValid).toBeFalse();
    });

    it('returns false for 333333333', () => {
      component.policies = ['333333333'];
      component.ngOnChanges();

      expect(component.processedPolicies[0].isValid).toBeFalse();
    });

    it('returns false for non-numeric input', () => {
      component.policies = ['not-a-num'];
      component.ngOnChanges();

      expect(component.processedPolicies[0].isValid).toBeFalse();
    });
  });

  /* --- submitPolicies --- */

  describe('submitPolicies', () => {
    beforeEach(() => {
      component.policies = ['123456789', '664371495'];
      component.ngOnChanges();
      fixture.detectChanges();
    });

    it('sets submissionStatus to loading immediately', () => {
      component.submitPolicies();

      expect(component.submissionStatus).toBe('loading');
      httpTesting.expectOne(API_URL).flush({ id: 101 });
    });

    it('POSTs processedPolicies to the correct URL', () => {
      component.submitPolicies();

      const req = httpTesting.expectOne(API_URL);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(component.processedPolicies);
      req.flush({ id: 101 });
    });

    it('sets submissionStatus to success and stores the response id on success', () => {
      component.submitPolicies();
      httpTesting.expectOne(API_URL).flush({ id: 101 });

      expect(component.submissionStatus).toBe('success');
      expect(component.submissionId).toBe(101);
    });

    it('sets submissionStatus to error on failure', () => {
      component.submitPolicies();
      httpTesting
        .expectOne(API_URL)
        .flush(null, { status: 500, statusText: 'Server Error' });

      expect(component.submissionStatus).toBe('error');
      expect(component.submissionId).toBeNull();
    });
  });

  /* --- HTML/rendering --- */

  describe('Component HTML', () => {
    it('renders the empty state component when there are no policies', () => {
      component.policies = [];
      component.ngOnChanges();
      fixture.detectChanges();

      expect(
        fixture.nativeElement.querySelector('table-empty-state'),
      ).toBeTruthy();
      expect(fixture.nativeElement.querySelector('table')).toBeNull();
    });

    it('renders the table when there are policies', () => {
      component.policies = ['123456789', '664371495'];
      component.ngOnChanges();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('table')).toBeTruthy();
      expect(
        fixture.nativeElement.querySelector('table-empty-state'),
      ).toBeNull();
    });

    it('renders a row for each policy with its number and valid status', () => {
      component.policies = ['123456789', '664371495'];
      component.ngOnChanges();
      fixture.detectChanges();

      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(2);

      const [firstRow, secondRow] = rows;
      expect(firstRow.textContent).toContain('123456789');
      expect(firstRow.textContent).toContain('valid');
      expect(secondRow.textContent).toContain('664371495');
      expect(secondRow.textContent).toContain('error');
    });

    it('renders the submit button when policies are present', () => {
      component.policies = ['123456789'];
      component.ngOnChanges();
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector(
        '.policy-table__submit-button',
      );
      expect(button).toBeTruthy();
      expect(button.textContent.trim()).toBe('Submit Policy Numbers');
    });

    it('disables the submit button and shows "Submitting..." while loading', () => {
      component.policies = ['123456789'];
      component.ngOnChanges();
      component.submissionStatus = 'loading';
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector(
        '.policy-table__submit-button',
      );
      expect(button.disabled).toBeTrue();
      expect(button.textContent.trim()).toBe('Submitting...');
    });

    it('shows the success message with the submission ID', () => {
      component.policies = ['123456789'];
      component.ngOnChanges();
      component.submissionStatus = 'success';
      component.submissionId = 101;
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'Success! Submission ID: 101',
      );
    });

    it('shows the error message on failure', () => {
      component.policies = ['123456789'];
      component.ngOnChanges();
      component.submissionStatus = 'error';
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain(
        'Submission failed. Please try again.',
      );
    });

    it('calls submitPolicies when the submit button is clicked', () => {
      component.policies = ['123456789'];
      component.ngOnChanges();
      fixture.detectChanges();

      spyOn(component, 'submitPolicies');
      fixture.nativeElement
        .querySelector('.policy-table__submit-button')
        .click();

      expect(component.submitPolicies).toHaveBeenCalled();
    });
  });
});
