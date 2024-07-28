import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
  FileUploadStateDecoratorFn as DecoratorFn
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';

const ID = Flags.AwaitingFileValidation;
const validFileTypes = new Set(['text/csv']);

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): DecoratorFn {
  return function (baseState: State): State {
    const thisState = stateFn as State;

    Object.defineProperties(thisState, {
      ...Object.getOwnPropertyDescriptors(baseState),
      description: prop(initialValue('Awaiting File Validation'), readOnly)
    } as ObjectProps<State>);

    return thisState;

    function stateFn(options: StateOptions): void {
      if (options.file) {
        validateFile(options.file);
      }
    }

    function validateFile(file: File): void {
      const maxSize = 2000000; // 2mb

      if (!validFileTypes.has(file.type)) {
        internals.flags |= Flags.InvalidFileType;
      }
      if (file.size > maxSize) {
        internals.flags |= Flags.ExceedsMaxFileSize;
      }

      if (internals.flags & Flags.AnyFileError) {
        internals.setState(Flags.AwaitingFileSelection);
      } else {
        internals.file = file;
        internals.setState(Flags.ParsingFile);
      }
    }
  };
}
