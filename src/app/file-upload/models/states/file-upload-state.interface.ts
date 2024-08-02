import { Modal } from '@shared/models';
import { PoliciesDataClient } from '../data';
import { PolicyRecord } from '../policy-records';

export interface FileUploadState extends FileUploadStateFn {
  description: string;
  fileName: string;
  fileSize: string;
  flags: number;
  policies: PolicyRecord[];
  submissionId: string;
}

export type FileUploadStateFn = (options: FileUploadStateOptions) => void;

export interface FileUploadStateInternals {
  setState(id: number): FileUploadState;
  data: PoliciesDataClient;
  modal: Modal;
  flags: number;
  policies: {
    all: PolicyRecord[];
    byId: Map<number, PolicyRecord>;
  };
  file?: File;
  submissionId?: string;
}

export interface FileUploadStateOptions {
  cancel?: boolean;
  file?: File;
  initialize?: boolean;
  submit?: boolean;
  submissionId?: string;
  suspend?: boolean;
}

export type FileUploadStateFactoryFn = (
  internals: FileUploadStateInternals,
) => FileUploadState;
