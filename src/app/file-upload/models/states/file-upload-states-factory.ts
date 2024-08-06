import { Modal } from '@shared/models';
import { PoliciesDataClient } from '../data';
import { PolicyRecord } from '../policy-records';
import { fileUploadNoopState } from './file-upload-noop-state';
import { FileUploadStateFlags } from './file-upload-state-flags.enum';
import {
  FileUploadState,
  FileUploadStateFactoryFn,
  FileUploadStateInternals
} from './file-upload-state.interface';

const factories = new Map<number, FileUploadStateFactoryFn>();
let superStates = FileUploadStateFlags.None;

export function fileUploadStatesFactory({
  setState: setStateBase,
  data,
  modal
}: Config): (id: number) => FileUploadState {
  const internals: FileUploadStateInternals = {
    setState,
    data,
    flags: FileUploadStateFlags.None,
    modal,
    policies: {
      byId: new Map<number, PolicyRecord>(),
      all: []
    },
  };

  return createState;

  function createState(id: number): FileUploadState {
    internals.flags &= ~superStates;
    internals.flags |= id;

    return create();

    function create(): FileUploadState {
      const factory = factories.get(id);
      const state = factory ? factory(internals) : fileUploadNoopState();

      return Object.seal(state);
    }
  };

  function setState(id: number): FileUploadState {
    const nextState = createState(id);

    setStateBase(nextState);

    return nextState;
  }
}

fileUploadStatesFactory.register = (
  key: number,
  fn: FileUploadStateFactoryFn
) => {
  factories.set(key, fn);
  superStates |= key;
}

interface Config {
  setState(nextState: FileUploadState): void;
  data: PoliciesDataClient;
  modal: Modal;
}
