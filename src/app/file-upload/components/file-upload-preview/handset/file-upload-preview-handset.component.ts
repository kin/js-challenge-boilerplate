import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  Signal,
} from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadPoliciesListComponent } from '../../file-upload-policies-list';
import { FileUploadStateFlags as StateFlags } from '@file-upload/models';
import { FileSelectionButtonComponent } from '@shared/components';

const selector = 'kn-file-upload-preview-handset';

@Component({
  selector,
  templateUrl: `./file-upload-preview-handset.component.html`,
  styleUrls: ['./file-upload-preview-handset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadPoliciesListComponent,
    FileSelectionButtonComponent
  ]
})
export class FileUploadPreviewHandsetComponent {
  public fileName = computeFileName();
  public fileSize = computeFileSize();
  public policies = computePolicies();
  public showMenuButton = computeShowMenuButton();
  public selectFile = selectFileFn();

  @HostBinding('class')
  public readonly klass = selector;
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

function computeShowMenuButton(): Signal<number> {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return ctx.state().flags & StateFlags.FileSelected;
  });
}

function selectFileFn(): (file: File) => void {
  const ctx = inject(FileUploadStateContext);

  return function selectFileFn(file: File): void {
    const state = ctx.state();

    state({ file });
  };
}