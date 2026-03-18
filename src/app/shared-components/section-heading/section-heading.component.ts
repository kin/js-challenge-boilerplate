import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `<h2 [id]="headingId" class="heading"><ng-content /></h2>`,
  styleUrl: './section-heading.component.scss',
})
export class SectionHeadingComponent {
  @Input() headingId = '';
}
