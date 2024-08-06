import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  inject
} from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';
import { FileUploadPoliciesListItemComponent } from './item';

const selector = 'kn-file-upload-policies-list';

@Component({
  selector,
  template: `
    @for (policy of policies(); track policy.policyNumber; let idx = $index) {
      <kn-file-upload-policies-list-item 
        [policy]="policy" 
        [recordNumber]="idx + 1" />
    }
  `,
  styleUrls: ['./file-upload-policies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FileUploadPoliciesListItemComponent
  ]
})
export class FileUploadPoliciesListComponent {
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
