import { PolicyRecord } from '../policy-records';
import { abstractBaseState } from './abstract-base-state';
import { fileUploadNoopState } from './file-upload-noop-state';
import { FileUploadStateFlags } from './file-upload-state-flags.enum';
import {
  FileUploadState,
  FileUploadStateDecoratorFactoryFn,
  FileUploadStateDecoratorFn,
  FileUploadStateInternals
} from './file-upload-state.interface';

const factories = new Map<number, FileUploadStateDecoratorFactoryFn>();

export function fileUploadStatesFactory({
  setState: setStateBase,
}: Config): (id: number) => FileUploadState {
  const internals: FileUploadStateInternals = {
    setState,
    flags: FileUploadStateFlags.None,
    policies: {
      byId: new Map<number, PolicyRecord>(),
      all: []
    },
  };
  const [decorators, superStates] = initializeDecorators(internals);

  return createState;

  function createState(id: number): FileUploadState {
    internals.flags &= ~superStates;
    internals.flags |= id;

    return create();

    function create(): FileUploadState {
      const decorator = decorators.get(id);
      const state = decorator
        ? decorator(abstractBaseState(internals))
        : fileUploadNoopState();

      return Object.seal(state);
    }
  };

  function setState(id: number): FileUploadState {
    const nextState = createState(id);

    setStateBase(nextState);

    return nextState;
  }
}

function initializeDecorators(
  internals: FileUploadStateInternals
): [Map<number, FileUploadStateDecoratorFn>, number] {
  const fns = new Map<number, FileUploadStateDecoratorFn>();
  let superStates = FileUploadStateFlags.None;

  for (const [k, fn] of factories.entries()) {
    fns.set(k, fn(internals));
    superStates |= k;
  }

  return [fns, superStates];
}

fileUploadStatesFactory.register = (
  key: number,
  fn: FileUploadStateDecoratorFactoryFn
) => {
  factories.set(key, fn);
}

interface Config {
  setState(nextState: FileUploadState): void;
}
