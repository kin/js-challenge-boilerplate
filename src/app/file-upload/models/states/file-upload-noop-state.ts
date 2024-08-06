import { FileUploadState } from './file-upload-state.interface';
import { FileUploadStateFlags } from './file-upload-state-flags.enum';

export function fileUploadNoopState(): FileUploadState {
  return Object.assign(stateFn, {
    description: 'No State',
    fileName: '',
    fileSize: '',
    flags: FileUploadStateFlags.None,
    policies: [],
    submissionId: '',
  } as { [p in keyof FileUploadState]: any; });

  function stateFn(): void { }
}
