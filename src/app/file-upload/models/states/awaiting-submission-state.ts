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

  try {
    return Object.assign(stateFn, baseState, {
      description: 'Awaiting Policies Submission'
    } as { [p in keyof State]: any; });
  } finally {
    internals.modal.open();
  }

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
