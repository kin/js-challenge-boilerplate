import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableEmptyStateComponent } from './table-empty-state.component';

describe('TableEmptyStateComponent', () => {
  let fixture: ComponentFixture<TableEmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableEmptyStateComponent);
    fixture.detectChanges();
  });

  it('renders', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});
