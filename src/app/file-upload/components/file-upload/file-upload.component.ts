import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadLayoutComponent } from '../file-upload-layout';

@Component({
  selector: 'kn-file-upload',
  template: `<kn-file-upload-layout />`,
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadLayoutComponent,
  ]
})
export class FileUploadComponent {

}
