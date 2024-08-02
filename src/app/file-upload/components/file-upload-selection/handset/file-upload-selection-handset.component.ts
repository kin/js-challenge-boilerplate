import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers/file-upload-state-context';
import { FileSelectionButtonComponent } from '@shared/components';
import { FileDropTargetDirective } from '@shared/directives';

const selector = 'kn-file-upload-selection-handset';

@Component({
  selector,
  templateUrl: 'file-upload-selection-handset.component.html',
  styleUrl: 'file-upload-selection-handset.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  hostDirectives: [{
    directive: FileDropTargetDirective,
    outputs: ['fileDropped']
  }],
  imports: [FileSelectionButtonComponent]
})
export class FileUploadSelectionHandsetComponent {
  public selectFile = selectFileFn();

  @HostBinding('class')
  public readonly klass = selector;
}

function selectFileFn(): (file: File) => void {
  const ctx = inject(FileUploadStateContext);

  return function (file: File): void {
    const state = ctx.state();

    state({ file });
  };
}
