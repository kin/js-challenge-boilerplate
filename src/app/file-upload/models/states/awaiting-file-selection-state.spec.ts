import * as sinon from 'sinon';
mockImports();

import { fileUploadStatesFactory } from './file-upload-states-factory';
import { FileUploadState, FileUploadStateFactoryFn, FileUploadStateInternals } from './file-upload-state.interface';
import { FileUploadStateFlags as StateFlags } from './file-upload-state-flags.enum';
import { abstractBaseState } from './abstract-base-state';
import './awaiting-file-selection-state';

describe('Registering the state with the states factory:', () => {
  let factory: { register(key: number, fn: FileUploadStateFactoryFn): void; };
  let registrationSpy: sinon.SinonSpy;
  let stateFactoryFn: FileUploadStateFactoryFn;

  beforeAll(() => {
    factory = fileUploadStatesFactory
    registrationSpy = factory.register as sinon.SinonSpy;
    stateFactoryFn = registrationSpy.getCall(0).args[1];
  });

  afterAll(() => {
    factory = undefined as any;
    registrationSpy = undefined as any;
    stateFactoryFn = undefined as any;
  });

  describe('Given: an ID for the state', () => {
    describe('When: registering the state with the factory', () => {
      describe('Then: the ID for the state', () => {
        it('should match the "AwaitingFileSelection" value on the "FileUploadStateFlags" enum', () => {
          expect(registrationSpy.getCall(0).args[0])
            .toBe(StateFlags.AwaitingFileSelection);
        });
      });

      describe('Then: a state factory function', () => {
        it('should be registered for the given ID', () => {
          expect(typeof registrationSpy.getCall(0).args[1]).toBe('function');
        });
      });
    });
  });

  describe('The state factory function:', () => {
    describe('Given: a state internals object', () => {
      let state: FileUploadState;

      describe('When: creating an instance of the registered state', () => {
        beforeEach(() => {
          state = stateFactoryFn(mockStateInternals());
        });

        afterEach(() => {
          state = undefined as any;
        });

        describe('Then: the state', () => {
          it('should be a function', () => {
            expect(typeof state).toBe('function');
          });
        });


        describe('Then: the "description" property on the state', () => {
          const description = 'Awaiting File Selection';

          it(`should equal "${description}"`, () => {
            expect(state.description).toBe(description);
          });
        });
      });
    });
  });

  describe('The state function returned from the state factory function:', () => {
    describe('Given: a "FileUploadStateOptions" object with a "file" property', () => {
      let setStateSpy: sinon.SinonSpy;
      let internals: FileUploadStateInternals;
      let state: FileUploadState;
      let baseStateSpy: sinon.SinonSpy;

      beforeEach(() => {
        internals = mockStateInternals();
        setStateSpy = internals.setState as sinon.SinonSpy;
        state = stateFactoryFn(internals);
        baseStateSpy = abstractBaseState as sinon.SinonSpy;
      });

      afterEach(() => {
        internals = undefined as any;
        setStateSpy = undefined as any;
        state = undefined as any;
        baseStateSpy = undefined as any;
      });

      describe("When: the state function is called", () => {
        describe('Then: the call', () => {
          it('should trigger a transition to the "Awaiting File Validation" state', () => {
            state({ file: {} as any });
            expect(
              setStateSpy.calledWith(StateFlags.AwaitingFileValidation)
            ).toBe(true);
          });
        });

        describe('Then: the call should trigger a transition to the "Awaiting File Validation" state and', () => {
          let file: any;
          let options: any;

          beforeEach(() => {
            file = {} as any;
            options = { file };
            state(options)
          });

          afterEach(() => {
            file = undefined;
            options = undefined;
          });

          it('should pass the value of the "file" property on the options object to the next state', () => {
            const nextStateSpy = setStateSpy.returnValues[0];

            expect(nextStateSpy.getCall(0).args[0].file).toBe(file);
          });

          it('should call the base state function', () => {
            const spy = baseStateSpy.returnValues[0] as sinon.SinonSpy;
            const otherOptions = spy.lastCall.args[0];
            
            expect(matchAllKeys()).toBe(true);

            function matchAllKeys(): boolean {
              return Object.keys(options).every(k => {
                return otherOptions[k] === options[k];
              });
            }
          });
        });

      });
    });
  });
});

function mockStateInternals(): FileUploadStateInternals {
  const setState = sinon.stub();

  setState.returns(sinon.stub());

  return { setState } as any;
}

function mockImports(): void {
  jest.doMock('./file-upload-states-factory', () => {
    return {
      fileUploadStatesFactory: {
        register: sinon.stub()
      }
    };
  }, { virtual: true });

  jest.doMock('./file-upload-state-flags.enum', () => {
    return {
      FileUploadStateFlags: {
        AwaitingFileSelection: 1,
        AwaitingFileValidation: 2,
      }
    };
  }, { virtual: true });

  jest.doMock('./abstract-base-state', () => {
    const stub = sinon.stub();

    stub.returns(sinon.stub());

    return {
      abstractBaseState: stub
    };
  }, { virtual: true });
}
