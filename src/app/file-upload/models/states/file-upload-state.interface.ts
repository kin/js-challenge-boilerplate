import { PolicyRecord } from '../policy-records';

export interface FileUploadState extends StateFn {
  description: string;
  fileName: string;
  fileSize: string;
  flags: number;
  policies: PolicyRecord[];
}

type StateFn = (options: FileUploadStateOptions) => void;

export interface FileUploadStateInternals {
  setState(id: number): FileUploadState;
  flags: number;
  file?: File;
  policies: {
    all: PolicyRecord[];
    byId: Map<number, PolicyRecord>;
  };
}

export interface FileUploadStateOptions {
  initialize?: boolean;
  suspend?: boolean;
  file?: File;
}

export type FileUploadStateDecoratorFactoryFn = (
  internals: FileUploadStateInternals
) => FileUploadStateDecoratorFn;

export type FileUploadStateDecoratorFn = (
  baseState: FileUploadState,
) => FileUploadState;
