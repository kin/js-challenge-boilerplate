import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `<span class="spinner" aria-live="polite" aria-label="Processing file…"></span>`,
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {}
