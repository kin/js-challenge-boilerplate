import * as sinon from 'sinon';
mockImports();

import { Directive, HostListener, output } from '@angular/core';
import { FileDropTargetDirective } from './file-drop-target.directive';

describe('The FileDropTargetDirective class:', () => {
  let directive: FileDropTargetDirective;
  let klass: any;
  let listener: sinon.SinonSpy;
  let outputSpy: sinon.SinonSpy;
  let cfg: Directive;

  beforeAll(() => {
    klass = FileDropTargetDirective;
    directive = new FileDropTargetDirective();
    outputSpy = ((output as unknown) as sinon.SinonSpy);
    cfg = ((Directive as unknown) as sinon.SinonSpy).getCall(0).args[0];
  });

  afterAll(() => {
    klass = undefined as any;
    directive = undefined as any;
    listener = undefined as any;
    outputSpy = undefined as any;
    cfg = undefined as any;
  });

  describe('When: configuring the class as a directive', () => {
    describe('Then: the directive', () => {
      it('should be configured as standalone', () => {
        expect(cfg.standalone).toBe(true);
      });
    });

    describe('Then: the directive selector', () => {
      const selector = '[knFileDropTarget]';

      it(`should equal "${selector}"`, () => {
        expect(cfg.selector).toBe(selector);
      });
    });
  });

  describe('When: instantiating the class', () => {
    describe(`Then: the "fileDropped" property of the class:`, () => {
      it(`should be an output signal`, () => {
        expect(directive.fileDropped).toBe(outputSpy.getCall(0).returnValue);
      });
    });

    describe(`Then: The "handleDrag" method of the class`, () => {
      it(`should be a handler for the "dragenter" DOM event`, () => {
        const decorators = klass.propDecorators.handleDrag as PropDecorator[];
        const decorator = decorators.find((x: any) => {
          return x.type === HostListener &&
            x.args.includes('dragenter');
        });
  
        expect(decorator).toBeDefined();
      });
  
      it(`should be a handler for the "dragover" DOM event`, () => {
        const decorators = klass.propDecorators.handleDrag as PropDecorator[];
        const decorator = decorators.find(x => {
          return x.type === HostListener &&
            x.args.includes('dragover');
        });
  
        expect(decorator).toBeDefined();
      });
  
      describe('Given: a DragEvent', () => {
        describe('When: the method is called', () => {
          describe('Then: the method', () => {
            let mockEvent: MockDragEvent;
  
            beforeEach(() => {
              mockEvent = mockDragEvent();
              directive.handleDrag(mockEvent as any);
            });
  
            afterEach(() => mockEvent = undefined as any);
  
            it(`should stop the DragEvent's propagation`, () => {
              expect(mockEvent.stopPropagation.called).toBe(true);
            });
  
            it('should prevent the default behavior of the DragEvent', () => {
              expect(mockEvent.preventDefault.called).toBe(true);
            });
  
            it(`should set the "dropEffect" property on the DragEvent's "dataTransfer" object to "copy"`, () => {
              expect(mockEvent.dataTransfer.dropEffect).toBe('copy');
            });
          });
        });
      });
    });

    describe(`Then: the "handleDrop" method of the class`, () => {
      it(`should be a handler for the "drop" DOM event`, () => {
        const decorators = klass.propDecorators.handleDrop as PropDecorator[];
        const decorator = decorators.find(x => {
          return x.type === HostListener &&
            x.args.includes('drop');
        });

        expect(decorator).toBeDefined();
      });

      describe('Given: a DragEvent', () => {
        describe('When: the method is called', () => {
          describe('Then: the method', () => {
            let mockedEvent: MockDragEvent;
  
            beforeEach(() => {
              mockedEvent = mockDragEvent();
              directive.handleDrop(mockedEvent as any);
            });
  
            afterEach(() => mockedEvent = undefined as any);
  
            it(`should stop the DragEvent's propagation`, () => {
              expect(mockedEvent.stopPropagation.called).toBe(true);
            });
  
            it('should prevent the default behavior of the DragEvent', () => {
              expect(mockedEvent.preventDefault.called).toBe(true);
            });
  
            it(`should call the "emit" method of object that is assigned to the "fileDropped" property of the class`, () => {
              const spy = outputSpy.getCall(0).returnValue.emit as sinon.SinonSpy;
  
              expect(spy.called).toBe(true);
            });
  
            it(`should pass the "files" array from the DragEvent's "dataTransfer" object to the "emit" method of the object that is assigned to the "fileDropped" property of the class`, () => {
              const spy = outputSpy.getCall(0).returnValue.emit as sinon.SinonSpy;
  
              expect(spy.calledWith(mockedEvent.dataTransfer.files)).toBe(true);
            });
          });
        });
      });
    });
  });

  

  
});

//#region helpers

interface MockDragEvent {
  stopPropagation: sinon.SinonStub;
  preventDefault: sinon.SinonStub;
  dataTransfer: {
    files: any[];
    dropEffect?: string;
  };
}

interface PropDecorator {
  type: any;
  args: any[];
}

function mockDragEvent(): MockDragEvent {
  return {
    stopPropagation: sinon.stub(),
    preventDefault: sinon.stub(),
    dataTransfer: { files: [] }
  };
}

function mockImports(): void {
  mockAngularCore();

  function mockAngularCore(): void {
    jest.doMock('@angular/core', () => {
      const output = sinon.stub();

      output.returns({ emit: sinon.stub() });

      return {
        Directive: sinon.stub(),
        HostListener: sinon.stub(),
        output,
      };
    }, { virtual: true });
  }
}

//#endregion
