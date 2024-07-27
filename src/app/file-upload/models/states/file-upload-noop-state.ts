import { initialValue, ObjectProps, prop } from '@shared/models';
import { FileUploadState } from './file-upload-state.interface';
import { FileUploadStateFlags } from './file-upload-state-flags.enum';

export function fileUploadNoopState(): FileUploadState {
  const thisState = {} as FileUploadState;

  Object.defineProperties(thisState, {
    description: prop(initialValue('No State')),
    flags: prop(initialValue(FileUploadStateFlags.None)),
  } as ObjectProps<FileUploadState>);

  return thisState;
}
