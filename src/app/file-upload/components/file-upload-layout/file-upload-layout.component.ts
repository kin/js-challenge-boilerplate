import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FileUploadSelectionComponent } from '../file-upload-selection';
import { FileUploadPreviewComponent } from '../file-upload-preview';
import { FileUploadStateContext } from '@file-upload/providers';

@Component({
  selector: 'kn-file-upload-layout',
  template: `
    <h1 class='page-header'>OCR File Upload</h1>
    <kn-file-upload-selection (fileDropped)="selectFile($event)" />
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
  public selectFile = selectFileFn();
}

function selectFileFn(): (fileList: any) => void {
  const ctx = inject(FileUploadStateContext);

  return function selectFile(fileList: any): void {
    const state = ctx.state();
    const [file] = fileList;

    console.log(file);
    state({ file });
  };
}
