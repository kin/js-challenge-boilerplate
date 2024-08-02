import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import {
  fileUploadNoopState,
  FileUploadState,
  FileUploadStateFlags,
  fileUploadStatesFactory
} from '@file-upload/models';
import { PoliciesDataClient } from './policies-data-client';
import { FileUploadModal } from './file-upload-modal';

@Injectable({ providedIn: 'root' })
export class FileUploadStateContext {
  readonly state: Signal<FileUploadState>;

  constructor(data: PoliciesDataClient, modal: FileUploadModal) {
    const state = signal(fileUploadNoopState());
    const setState = setStateFn(state);
    const createState = fileUploadStatesFactory({ setState, data, modal });

    setState(createState(FileUploadStateFlags.Idle));
    this.state = state;
  }
}

function setStateFn(
  state: WritableSignal<FileUploadState>
): (next: FileUploadState) => void {
  return function (next: FileUploadState): void {
    console.log(serializeState(next));
    state.set(next);
  }
}

function serializeState(state: FileUploadState): { [key: string]: any; } {
  return Object.keys(state).reduce((obj, k) => {
    obj[k] = (state as any)[k];
    return obj;
  }, {} as { [key: string]: any; });
}
