import { Routes } from '@angular/router';
import { FileUploadComponent } from './components';
import {
  initializeFileUploadState,
  suspendFileUploadState
} from './models';

export const fileUploadRoutes: Routes = [
  {
    path: '',
    component: FileUploadComponent,
    canActivate: [initializeFileUploadState],
    canDeactivate: [suspendFileUploadState]
  }
];
