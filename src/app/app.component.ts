import { Component } from '@angular/core';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { PolicyTableComponent } from './policy-table/policy-table.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { KinLogoComponent } from './kin-logo/kin-logo.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [UploadFormComponent, PolicyTableComponent, PageLayoutComponent, KinLogoComponent]
})
export class AppComponent {
  title = 'kin-ocr';
  policies: string[] = [];

  onCsvParsed(rows: string[]): void {
    this.policies = rows;
  }
}
