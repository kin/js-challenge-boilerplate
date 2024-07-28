import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
  FileUploadStateDecoratorFn as StateDecoratorFn
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';

const ID = Flags.AwaitingFileSelection;

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): StateDecoratorFn {
  return function (baseState: State): State {
    const thisState = stateFn as State;

    Object.defineProperties(thisState, {
      ...Object.getOwnPropertyDescriptors(baseState),
      description: prop(initialValue('Awaiting File Selection'), readOnly)
    } as ObjectProps<State>);

    return thisState;

    function stateFn(options: StateOptions): void {
      const { file } = options;

      if (file) {
        const nextState = internals.setState(Flags.AwaitingFileValidation);

        nextState({ file });
      }
      baseState(options);
    }
  };
}
