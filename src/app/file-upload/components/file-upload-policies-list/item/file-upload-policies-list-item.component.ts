import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input
} from '@angular/core';
import { PolicyRecord } from '@file-upload/models';

const selector = 'kn-file-upload-policies-list-item';

@Component({
  selector,
  templateUrl: `./file-upload-policies-list-item.component.html`,
  styleUrls: ['./file-upload-policies-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FileUploadPoliciesListItemComponent {
  @HostBinding('class')
  public readonly klass = selector

  public policy = input.required<PolicyRecord>();

  public recordNumber = input.required<number>();
}
