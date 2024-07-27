import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'kn-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet />`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kin-ocr';
}
