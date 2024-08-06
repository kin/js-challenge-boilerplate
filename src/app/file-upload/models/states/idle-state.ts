import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';

const ID = Flags.Idle

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);
  const thisState = stateFn as State;

  Object.assign(thisState, baseState, {
    description: 'Idle'
  } as { [p in keyof State]: any; });

  return thisState;

  function stateFn(options: StateOptions): void {
    if (options.initialize) {
      internals.setState(Flags.AwaitingFileSelection);
    }
    baseState(options);
  }
}