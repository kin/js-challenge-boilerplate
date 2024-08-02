import { DialogModule } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NotificationComponent,
  SimpleSpinnerComponent
} from '@shared/components';

@Component({
  selector: 'kn-file-upload-modal-parsing-file',
  template: `
    <kn-notification>
      <div class="container">
        <kn-simple-spinner size="32" />
        <span>Parsing file... please wait</span>
      </div>
    </kn-notification>
  `,
  styleUrl: 'file-upload-modal-parsing-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DialogModule,
    NotificationComponent,
    SimpleSpinnerComponent
  ]
})
export class FileUploadModalParsingFileComponent { }
