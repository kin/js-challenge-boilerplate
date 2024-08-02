import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FileUploadSelectionWebComponent } from '../../file-upload-selection';
import { FileUploadPreviewWebComponent } from '../../file-upload-preview';
import {
  FileUploadLayoutHeaderWebComponent
} from '../../file-upload-layout-header';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadStateFlags as StateFlags } from '@file-upload/models';

@Component({
  selector: 'kn-file-upload-layout-web',
  template: `
    <kn-file-upload-layout-header-web />
    @if (showSelection()) {
      <kn-file-upload-selection-web 
        (fileDropped)="selectFile($event)" 
        knFileDropTarget />
    } @else {
      <kn-file-upload-preview-web />
    }
  `,
  styleUrl: 'file-upload-layout-web.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadPreviewWebComponent,
    FileUploadSelectionWebComponent,
    FileUploadLayoutHeaderWebComponent,
  ]
})
export class FileUploadLayoutWebComponent {
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
