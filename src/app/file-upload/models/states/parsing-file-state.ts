import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { abstractBaseState } from './abstract-base-state';
import { policyRecord } from '../policy-records';
import { fromEvent, map, take } from 'rxjs';

const ID = Flags.ParsingFile

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): State {
  const baseState = abstractBaseState(internals);
  const thisState = stateFn as State;

  Object.defineProperties(thisState, {
    ...Object.getOwnPropertyDescriptors(baseState),
    description: prop(initialValue('Parsing File State'), readOnly)
  } as ObjectProps<State>);

  internals.modal.open();

  try {
    return thisState;
  } finally {
    setTimeout(parseFile, 0);
  }

  function parseFile(): void {
    const reader = new FileReader();

    fromEvent(reader, 'load').pipe(
      map((e: any) => e.target!.result),
      map(x => x.split('\r\n')),
      take(1)
    ).subscribe(data => {
      const size = data.length - 2;

      internals.policies.all = new Array(size);

      for (let i = 0; i < size; i++) {
        internals.policies.all[i] = policyRecord(data[i + 1]);
      }
      internals.modal.dismiss();
      internals.setState(Flags.FileSelected);
    });

    reader.readAsText(internals.file!, 'utf-8');
  }

  function stateFn(options: StateOptions): void {
    baseState(options);
  }
}