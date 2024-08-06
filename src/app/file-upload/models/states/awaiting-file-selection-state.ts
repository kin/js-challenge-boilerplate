import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';

const ID = Flags.AwaitingFileSelection;

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);

  return Object.assign(stateFn, baseState, {
    description: 'Awaiting File Selection'
  } as { [p in keyof State]: any; });

  function stateFn(options: StateOptions): void {
    const { file } = options;

    if (file) {
      const nextState = internals.setState(Flags.AwaitingFileValidation);

      nextState({ file });
    }
    baseState(options);
  }
}
