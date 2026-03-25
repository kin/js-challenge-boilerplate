import { TestBed, ComponentFixture } from '@angular/core/testing';
import { KinLogoComponent } from './kin-logo.component';

describe('KinLogoComponent', () => {
  let fixture: ComponentFixture<KinLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KinLogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KinLogoComponent);
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});
