import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadPoliciesListComponent } from '../file-upload-policies-list';

@Component({
  selector: 'kn-file-upload-preview',
  templateUrl: `./file-upload-preview.component.html`,
  styleUrls: ['./file-upload-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadPoliciesListComponent
  ]
})
export class FileUploadPreviewComponent {
  public fileName = computeFileName();
  public fileSize = computeFileSize();
  public policies = computePolicies();
}

function computeFileName() {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return ctx.state().fileName;
  });
}

function computeFileSize() {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return ctx.state().fileSize;
  });
}

function computePolicies() {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return ctx.state().policies;
  });
}
