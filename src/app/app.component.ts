import { Component } from '@angular/core';
import { HeaderComponent } from './shared-components/header/header.component';
import { PolicyUploadComponent } from './policy/policy-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PolicyUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
