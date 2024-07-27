import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadSelectionComponent } from '../file-upload-selection';
import { FileUploadPreviewComponent } from '../file-upload-preview';

@Component({
  selector: 'kn-file-upload-layout',
  template: `
    <h1 class='page-header'>OCR File Upload</h1>
    <kn-file-upload-selection />
    <kn-file-upload-preview />
  `,
  styleUrls: ['./file-upload-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadPreviewComponent,
    FileUploadSelectionComponent
  ]
})
export class FileUploadLayoutComponent {

}
