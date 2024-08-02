import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';

const ID = Flags.AwaitingSubmission;

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);
  const thisState = stateFn as State;

  Object.defineProperties(thisState, {
    ...Object.getOwnPropertyDescriptors(baseState),
    description: prop(initialValue('Awaiting Policies Submission'), readOnly)
  } as ObjectProps<State>);

  internals.modal.open();

  return thisState;

  function stateFn(options: StateOptions): void {
    const { submissionId } = options;

    if (submissionId) {
      internals.modal.dismiss();
      internals.submissionId = submissionId;
      internals.setState(Flags.SubmissionSuccess);
    }
    baseState(options);
  }
}
