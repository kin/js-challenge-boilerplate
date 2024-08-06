import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  forwardRef,
  HostBinding,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

const baseSelector = 'kn-dialog';

// marker abstract class (similar to marker interface in OOP world)
abstract class DialogChild { }

@Directive({
  selector: `${baseSelector}-title, [${baseSelector}-title]`,
  standalone: true,
  providers: [
    { provide: DialogChild, useClass: forwardRef(() => DialogTitleDirective) }
  ]
})
export class DialogTitleDirective extends DialogChild {
  @HostBinding('class')
  public readonly klass = `${baseSelector}-title`;
}

@Directive({
  selector: `${baseSelector}-actions, [${baseSelector}-actions]`,
  standalone: true,
  providers: [
    { provide: DialogChild, useClass: forwardRef(() => DialogActionsDirective) }
  ]
})
export class DialogActionsDirective extends DialogChild {
  @HostBinding('class')
  public readonly klass = `${baseSelector}-actions`;
}

@Component({
  selector: `${baseSelector}, [${baseSelector}]`,
  styleUrl: 'dialog.component.scss',
  templateUrl: 'dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    DialogTitleDirective,
    DialogActionsDirective,
  ]
})
export class DialogComponent {
  public close(): void {
    this.closed.emit();
  }
  public readonly closed = output<void>();

  public hasCloseButton = input<boolean, BooleanInput>(false, {
    transform: coerceBooleanProperty
  });

  @HostBinding('class')
  public get klass(): string {
    let cssClasses = baseSelector;

    if (this._children.find(c => c instanceof DialogActionsDirective)) {
      cssClasses += ` ${baseSelector}--dialog-actions`
    }
    if (this._children.find(c => c instanceof DialogTitleDirective)) {
      cssClasses += ` ${baseSelector}--dialog-title`
    }
    return cssClasses;
  }

  @ContentChildren(DialogChild)
  private _children: DialogChild[] = [];
}
