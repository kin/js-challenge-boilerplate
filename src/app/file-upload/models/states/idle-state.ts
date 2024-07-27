import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
  FileUploadStateDecoratorFn as DecoratorFn
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';

const ID = Flags.Idle

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): DecoratorFn {
  return function (baseState: State): State {
    const thisState = stateFn as State;

    Object.defineProperties(thisState, {
      ...Object.getOwnPropertyDescriptors(baseState),
      description: prop(initialValue('Idle State'), readOnly)
    } as ObjectProps<State>);

    return thisState;

    function stateFn(options: StateOptions): void {
      if (options.initialize) {
        internals.setState(Flags.AwaitingFileSelection);
      }
      baseState(options);
    }
  };
}