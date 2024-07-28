import { initialValue, ObjectProps, prop, readOnly } from '@shared/models';
import { FileUploadStateFlags as Flags } from './file-upload-state-flags.enum';
import {
  FileUploadStateInternals as StateInternals,
  FileUploadState as State,
  FileUploadStateOptions as StateOptions,
  FileUploadStateDecoratorFn as StateDecoratorFn
} from './file-upload-state.interface';
import { fileUploadStatesFactory } from './file-upload-states-factory';
import { policyRecord } from '../policy-records';

const ID = Flags.ParsingFile

fileUploadStatesFactory.register(ID, state);

function state(internals: StateInternals): StateDecoratorFn {
  return function (baseState: State): State {
    const thisState = stateFn as State;

    Object.defineProperties(thisState, {
      ...Object.getOwnPropertyDescriptors(baseState),
      description: prop(initialValue('Parsing File State'), readOnly)
    } as ObjectProps<State>);

    try {
      return thisState;
    } finally {
      setTimeout(parseFile, 0);
    }

    function parseFile(): void {
      const mockData = [
        345882865,
        457508000,
        664371495,
      ];

      internals.policies.byId.clear();

      for (const d of mockData) {
        const record = policyRecord(d);
        internals.policies.byId.set(d, record);
      }
      internals.policies.all = [...internals.policies.byId.values()];
      internals.setState(Flags.AwaitingFileUpload);
    }

    function stateFn(options: StateOptions): void {
      baseState(options);
    }
  };
}