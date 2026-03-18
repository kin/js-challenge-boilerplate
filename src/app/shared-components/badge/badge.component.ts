import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span class="badge" [attr.aria-label]="ariaLabel ?? null">{{ count }}</span>
  `,
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() count = 0;
  @Input() ariaLabel?: string;
}
