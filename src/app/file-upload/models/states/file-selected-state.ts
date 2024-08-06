import { take } from 'rxjs';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';

const ID = Flags.FileSelected;

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);
  const thisState = stateFn as State;

  return Object.assign(thisState, baseState, {
    description: 'File Selected'
  } as { [p in keyof State]: any; });

  function handleFile(file: File): void {
    const nextState = internals.setState(Flags.AwaitingFileValidation);

    delete internals.file;
    internals.policies.all = [];
    nextState({ file });
  }

  function handleSubmit(): void {
    const nextState = internals.setState(Flags.AwaitingSubmission);

    internals.data.sendPolicyData(internals.policies.all).pipe(
      take(1)
    ).subscribe(submissionId => nextState({ submissionId }));
  }

  function stateFn(options: StateOptions): void {
    const { file, submit } = options;

    if (file) {
      handleFile(file);
    }
    if (submit) {
      handleSubmit();
    }
    baseState(options);
  }
}
