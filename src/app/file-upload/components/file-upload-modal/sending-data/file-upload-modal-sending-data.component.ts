import { DialogModule } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { 
  NotificationComponent, 
  SimpleSpinnerComponent 
} from '@shared/components';

@Component({
  selector: 'kn-file-upload-modal-sending-data',
  template: `
    <kn-notification>
      <div class="container">
        <kn-simple-spinner size="32" />
        <span>Uploading policies to server... please wait</span>
      </div>
    </kn-notification>
  `,
  styleUrl: 'file-upload-modal-sending-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DialogModule,
    NotificationComponent,
    SimpleSpinnerComponent
  ]
})
export class FileUploadModalSendingDataComponent { }
