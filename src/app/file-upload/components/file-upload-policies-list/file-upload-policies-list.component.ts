import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';

@Component({
  selector: 'kn-file-upload-policies-list',
  templateUrl: `./file-upload-policies-list.component.html`,
  styleUrls: ['./file-upload-policies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class FileUploadPoliciesListComponent {
  public policies = computePolicies();
}

function computePolicies() {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return ctx.state().policies;
  });
}
