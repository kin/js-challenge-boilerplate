import { inject } from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';

export function initializeFileUploadState(): boolean {
  const state = inject(FileUploadStateContext).state();

  state({ initialize: true });
  
  return true;
}