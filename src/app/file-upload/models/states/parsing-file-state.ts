import { take } from 'rxjs';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';
import { policyRecord } from '../policy-records';
import { readFile } from '../read-file';

const ID = Flags.ParsingFile

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);
  const thisState = stateFn as State;

  Object.assign(thisState, baseState, {
    description: 'Parsing File'
  } as { [p in keyof State]: any; });

  try {
    return thisState;
  } finally {
    internals.modal.open();
  }

  function stateFn(options: StateOptions): void {
    if (options.file) {
      internals.file = {
        name: options.file.name,
        size: options.file.size
      };
      readFile(options.file).pipe(take(1)).subscribe(policyNumberData => {
        internals.policies.all = new Array(policyNumberData.length);

        for (const [i, p] of policyNumberData.entries()) {
          internals.policies.all[i] = policyRecord(+p);
        }
        internals.modal.dismiss();
        internals.setState(Flags.FileSelected);
      });
    }
    baseState(options);
  }
}
