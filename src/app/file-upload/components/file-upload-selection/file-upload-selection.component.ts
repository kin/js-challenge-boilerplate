import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers/file-upload-state-context';
import { FileSelectionLinkComponent } from '@shared/components';
import { FileDropTargetDirective } from '@shared/directives';

@Component({
  selector: 'kn-file-upload-selection',
  templateUrl: './file-upload-selection.component.html',
  styleUrls: ['./file-upload-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  hostDirectives: [{
    directive: FileDropTargetDirective,
    outputs: ['fileDropped']
  }],
  imports: [FileSelectionLinkComponent]
})
export class FileUploadSelectionComponent {
  public selectFile = selectFileFn();
}

function selectFileFn(): (file: File) => void {
  const ctx = inject(FileUploadStateContext);

  return function (file: File): void {
    const state = ctx.state();

    state({ file });
  };
}
