import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadStateFlags as StateFlags } from '@file-upload/models';
import { DeviceComponent } from '@shared/components';
import { FileUploadLayoutWebComponent } from './web';
import { FileUploadLayoutHandsetComponent } from './handset';

@Component({
  selector: 'kn-file-upload-layout',
  template: `
    @switch (device()) {
      @case (Device.Web) {
        @defer {
          <kn-file-upload-layout-web />
        }
      }
      @default {
        @defer {
          <kn-file-upload-layout-handset />
        }
      }
    }
  `,
  styleUrls: ['./file-upload-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadLayoutWebComponent,
    FileUploadLayoutHandsetComponent,
  ]
})
export class FileUploadLayoutComponent extends DeviceComponent {
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
