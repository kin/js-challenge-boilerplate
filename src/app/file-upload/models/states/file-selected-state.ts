import { take } from 'rxjs';
import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
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

  Object.defineProperties(thisState, {
    ...Object.getOwnPropertyDescriptors(baseState),
    description: prop(initialValue('File Selected'), readOnly)
  } as ObjectProps<State>);

  return thisState;

  function handleFile(file: File): void {
    const nextState = internals.setState(Flags.AwaitingFileValidation);

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
