import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  standalone: true,
  template: `
    <section class="section-card" [attr.aria-labelledby]="ariaLabelledBy || null">
      <ng-content />
    </section>
  `,
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  @Input() ariaLabelledBy = '';
}
