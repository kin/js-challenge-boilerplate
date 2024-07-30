import { getter, initialValue, ObjectProps, prop } from '@shared/models';
import {
  FileUploadState,
  FileUploadStateInternals,
  FileUploadStateOptions
} from './file-upload-state.interface';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import { PolicyRecord } from '../policy-records';

export function abstractBaseState(
  internals: FileUploadStateInternals
): FileUploadState {
  const thisState = stateFn as FileUploadState;

  Object.defineProperties(thisState, {
    description: prop(initialValue('No State')),
    fileName: prop(getter(getFileName)),
    fileSize: prop(getter(getFileSize)),
    flags: prop(getter(() => internals.flags)),
    policies: prop(getter(() => internals.policies.all)),
    submissionId: prop(getter(() => internals.submissionId || ''))
  } as ObjectProps<FileUploadState>);

  return thisState;

  function cleanUpAndSuspend(): void {
    delete internals.file;
    delete internals.submissionId;

    internals.policies = { all: [], byId: new Map() };
    internals.flags = Flags.None;
    internals.setState(Flags.Idle);
  }

  function getFileName(): string {
    return internals.file ? internals.file.name : '';
  }

  function getFileSize(): string {
    const { file } = internals;
    const ONE_MB = 1000000;
    const ONE_KB = 1000;

    if (file) {
      const { size } = file;

      if (size > ONE_MB) {
        return `${(size / ONE_MB).toFixed(2)}mb`;
      }
      if (size > ONE_KB) {
        return `${(size / ONE_KB).toFixed(1)}kb`;
      }
      return `${size} bytes`;
    }
    return '';
  }

  function stateFn({
    suspend,
  }: FileUploadStateOptions): void {
    if (suspend) {
      cleanUpAndSuspend();
    }
  }
}