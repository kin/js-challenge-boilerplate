import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'file-upload'
  },
  {
    path: 'file-upload',
    loadChildren: () => import('./file-upload/file-upload.routes')
      .then(r => r.fileUploadRoutes)
  }
];
