import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal
} from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { FileUploadStateContext } from '@file-upload/providers';
import {
  FileUploadStateFlags as Modal
} from '@file-upload/models';
import { FileUploadModalParsingFileComponent } from './parsing-file';
import { FileUploadModalSendingDataComponent } from './sending-data';
import {
  FileUploadModalSubmissionSuccessComponent
} from './submission-success';
import { FileUploadModalFileSizeErrorComponent } from './file-size-error';
import { FileUploadModalFileTypeErrorComponent } from './file-type-error';

@Component({
  selector: 'kn-file-upload-modal',
  templateUrl: 'file-upload-modal.component.html',
  styleUrl: 'file-upload-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DialogModule,
    FileUploadModalParsingFileComponent,
    FileUploadModalSendingDataComponent,
    FileUploadModalSubmissionSuccessComponent,
    FileUploadModalFileSizeErrorComponent,
    FileUploadModalFileTypeErrorComponent
  ]
})
export class FileUploadModalComponent {
  public modal = computeModal();
  public Modal = Modal;
}

function computeModal(): Signal<number> {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return ctx.state().flags & (
      Modal.ParsingFile |
      Modal.AwaitingSubmission |
      Modal.SubmissionSuccess |
      Modal.FileSizeError |
      Modal.FileTypeError
    );
  });
}