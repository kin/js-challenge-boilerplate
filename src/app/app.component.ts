import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'kn-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kin-ocr';
}
