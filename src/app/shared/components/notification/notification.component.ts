import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

const selector = 'kn-notification';

@Component({
  selector,
  styleUrl: 'notification.component.scss',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class NotificationComponent {
  @HostBinding('class')
  public readonly klass = selector;
}
