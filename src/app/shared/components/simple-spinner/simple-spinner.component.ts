import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

const selector = 'kn-simple-spinner';

@Component({
  selector,
  styleUrl: 'simple-spinner.component.scss',
  templateUrl: 'simple-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SimpleSpinnerComponent {
  @HostBinding('class')
  public klass = selector;

  public size = input<number, NumberInput>(48, {
    transform: coerceNumberProperty
  });

  @HostBinding('style')
  public get style(): string {
    return `padding-left: ${this.size()}px;`;
  }
}
