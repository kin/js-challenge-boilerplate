import {
  ChangeDetectionStrategy,
  Component,
  HostBinding
} from '@angular/core';

const selector = 'kn-file-upload-layout-header-handset';

@Component({
  selector,
  template: `
    <h1 class='kn-file-upload-layout-header__title'>OCR File Upload</h1>
  `,
  styleUrls: ['./file-upload-layout-header-handset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FileUploadLayoutHeaderHandsetComponent {
  @HostBinding('class')
  public readonly klass = selector;
}
