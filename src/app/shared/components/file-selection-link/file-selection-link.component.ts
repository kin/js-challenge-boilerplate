import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
  output,
  Signal
} from '@angular/core';

const selector = 'kn-file-selection-link';
let uniqueId = 1;

@Component({
  selector,
  styleUrl: 'file-selection-link.component.scss',
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
export class FileSelectionLinkComponent {
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
  public klass = selector;  
}
