import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button [class]="'btn btn--' + variant" (click)="clicked.emit()">
      <ng-content />
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: 'outline' | 'primary' = 'primary';
  @Output() clicked = new EventEmitter<void>();
}
