import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject,
} from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';

const selector = 'kn-file-upload-policies-table';

@Component({
  selector,
  templateUrl: `./file-upload-policies-table.component.html`,
  styleUrls: ['./file-upload-policies-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class FileUploadPoliciesTableComponent {
  public policies = computePolicies();

  @HostBinding('class')
  public readonly klass = selector
}

function computePolicies() {
  const ctx = inject(FileUploadStateContext);

  return computed(() => {
    return ctx.state().policies;
  });
}
