import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
  output,
  Signal
} from '@angular/core';

const selector = 'kn-file-selection-button';
let uniqueId = 1;

@Component({
  selector,
  styleUrl: 'file-selection-button.component.scss',
  template: `
    <label [attr.for]="elementId()" tabindex="0">
      <ng-content />
      <input type="file" aria-hidden="true"
        [id]="elementId()"
        (change)="handleChange($event)"
        [accept]="fileTypes()" />
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class FileSelectionButtonComponent {
  public constructor() {
    this.fileTypes = computed(() => {
      const accept = this.accept();

      return accept ? accept.join(', ') : ''
    });
  }

  public handleChange(event: any): void {
    const [file] = event.target.files;

    this.fileSelected.emit(file);
  }

  public accept = input<string[]>();

  public elementId = input(`${selector}-${uniqueId++}`);

  public readonly fileSelected = output<File>();

  public fileTypes: Signal<string>;

  @HostBinding('class')
  public get klass() {
    let cssClasses = selector;

    if (this.stroked()) {
      cssClasses += ` stroked`;
    }
    if (this.primary()) {
      cssClasses += ` primary`;
    }
    return cssClasses;
  }

  public primary = input<boolean, BooleanInput>(false, {
    transform: coerceBooleanProperty
  });

  public stroked = input<boolean, BooleanInput>(false, {
    transform: coerceBooleanProperty
  });
}
