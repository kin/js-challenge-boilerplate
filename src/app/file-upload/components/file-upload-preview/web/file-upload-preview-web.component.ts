import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
  Signal,
  ViewChild
} from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadStateFlags as StateFlags } from '@file-upload/models';
import { FileSelectionButtonComponent } from '@shared/components';
import { FileUploadPoliciesTableComponent } from '@file-upload/components/file-upload-policies-table';

const selector = 'kn-file-upload-preview-web';

@Component({
  selector,
  templateUrl: `./file-upload-preview-web.component.html`,
  styleUrls: ['./file-upload-preview-web.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadPoliciesTableComponent,
    FileSelectionButtonComponent
  ]
})
export class FileUploadPreviewWebComponent {
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