import { Component, Input } from '@angular/core';

export type IconName = 'upload' | 'success' | 'alert';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() name: IconName = 'upload';
  @Input() size: 'sm' | 'md' = 'md';

  get iconClass(): string {
    return `icon icon--${this.size}${this.name === 'success' ? ' icon--success' : ''}`;
  }
}
