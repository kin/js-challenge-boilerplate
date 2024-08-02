import { ChangeDetectionStrategy, Component, computed, HostBinding, inject, Signal } from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadStateFlags as StateFlags } from '@file-upload/models';

const selector = 'kn-file-upload-layout-header-web';
@Component({
  selector,
  template: `
    <h1 class='kn-file-upload-layout-header-web__title'>OCR File Upload</h1>
    <button 
      class="kn-file-upload-layout-header-web__action kn-button primary" 
      type="button"
      (click)="submit()"
      [disabled]="submitButtonIsDisabled()">
      Submit policy numbers
    </button>
  `,
  styleUrls: ['./file-upload-layout-header-web.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FileUploadLayoutHeaderWebComponent {
  public submit = submitFn();
  public submitButtonIsDisabled = computeSubmitButtonIsDisabled();

  @HostBinding('class')
  public readonly klass = selector;
}

function computeSubmitButtonIsDisabled(): Signal<boolean> {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return !(ctx.state().flags & StateFlags.FileSelected);
  });
}

function submitFn(): () => void {
  const ctx = inject(FileUploadStateContext);

  return function submitPolicies(): void {
    const state = ctx.state();

    state({ submit: true });
  };
}
