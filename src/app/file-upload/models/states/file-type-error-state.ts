import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';

const ID = Flags.FileTypeError;

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);
  const thisState = stateFn as State;

  Object.defineProperties(thisState, {
    ...Object.getOwnPropertyDescriptors(baseState),
    description: prop(initialValue('File Type Error State'), readOnly)
  } as ObjectProps<State>);

  internals.modal.open();
  
  return thisState;

  function stateFn(options: StateOptions): void {
    const { submit } = options;

    if (submit) {
      internals.modal.dismiss();
      internals.setState(Flags.AwaitingFileSelection);
    }
    baseState(options);
  }
}
