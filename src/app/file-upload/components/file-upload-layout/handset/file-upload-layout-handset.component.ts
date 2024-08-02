import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal
} from '@angular/core';
import {
  FileUploadSelectionHandsetComponent
} from '../../file-upload-selection';
import { FileUploadPreviewHandsetComponent } from '../../file-upload-preview';
import {
  FileUploadLayoutHeaderHandsetComponent
} from '../../file-upload-layout-header';
import {
  FileUploadLayoutFooterHandsetComponent
} from '../../file-upload-layout-footer';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadStateFlags as StateFlags } from '@file-upload/models';

@Component({
  selector: 'kn-file-upload-layout-handset',
  template: `
    <kn-file-upload-layout-header-handset />
    @if (showSelection()) {
      <kn-file-upload-selection-handset />
    } @else {
      <kn-file-upload-preview-handset />
      <kn-file-upload-layout-footer-handset />
    }
  `,
  styleUrl: 'file-upload-layout-handset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadPreviewHandsetComponent,
    FileUploadLayoutHeaderHandsetComponent,
    FileUploadLayoutFooterHandsetComponent,
    FileUploadSelectionHandsetComponent
  ]
})
export class FileUploadLayoutHandsetComponent {
  public selectFile = selectFileFn();
  public showSelection = computeShowSelection();
}

function computeShowSelection(): Signal<number> {
  const ctx = inject(FileUploadStateContext);

  return computed(() => ctx.state().flags & StateFlags.AwaitingFileSelection)
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
