import { FileUploadState } from './file-upload-state.interface';
import { FileUploadStateFlags } from './file-upload-state-flags.enum';

export function fileUploadNoopState(): FileUploadState {
  const thisState = {} as FileUploadState;

  Object.assign(thisState, {
    description: 'No State',
    fileName: '',
    fileSize: '',
    flags: FileUploadStateFlags.None,
    policies: [],
    submissionId: '',
  } as { [p in keyof FileUploadState]: any; });

  return thisState;
}
