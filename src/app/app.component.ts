import { Component } from '@angular/core';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [UploadCsvComponent], // 👈 keep this here
})
export class AppComponent {
  title = 'kin-ocr';
}
