import { inject } from '@angular/core';
import { FileUploadStateContext } from '@file-upload/providers';

export function suspendFileUploadState(): boolean {
  const state = inject(FileUploadStateContext).state();

  state({ suspend: true });

  return true;
}