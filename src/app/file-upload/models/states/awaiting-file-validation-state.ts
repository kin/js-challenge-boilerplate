import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';

const ID = Flags.AwaitingFileValidation;
const validFileTypes = new Set(['text/csv']);

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);

  return Object.assign(stateFn, baseState, {
    description: 'Awaiting File Validation'
  } as { [p in keyof State]: any; });

  function stateFn(options: StateOptions): void {
    if (options.file) {
      internals.flags &= ~(Flags.AnyFileError);
      validateFile(options.file);
    }
  }

  function validateFile(file: File): void {
    const maxSize = 2000000; // 2mb

    if (!validFileTypes.has(file.type)) {
      internals.setState(Flags.FileTypeError);
      return;
    }
    if (file.size > maxSize) {
      internals.setState(Flags.FileSizeError);
      return;
    }

    const nextState = internals.setState(Flags.ParsingFile);

    nextState({ file });
  }
}
