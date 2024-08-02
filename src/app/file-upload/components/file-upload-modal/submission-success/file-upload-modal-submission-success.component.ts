import { DialogModule } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal
} from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';
import {
  DialogActionsDirective,
  DialogComponent,
  DialogTitleDirective
} from '@shared/components';

@Component({
  selector: 'kn-file-upload-modal-submission-success',
  templateUrl: 'file-upload-modal-submission-success.component.html',
  styleUrl: 'file-upload-modal-submission-success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DialogModule,
    DialogComponent,
    DialogTitleDirective,
    DialogActionsDirective
  ]
})
export class FileUploadModalSubmissionSuccessComponent {
  public dismiss = dismissFn();
  public submissionId = computeSubmissionId();
}

function computeSubmissionId(): Signal<string> {
  const ctx = inject(FileUploadStateContext);

  return computed(() => ctx.state().submissionId);
}

function dismissFn(): () => void {
  const ctx = inject(FileUploadStateContext);

  return function dismiss(): void {
    const state = ctx.state();

    state({ submit: true });
  }
}
