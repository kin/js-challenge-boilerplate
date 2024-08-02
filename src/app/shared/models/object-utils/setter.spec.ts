import { setter } from './setter';

describe('The "setter" function:', () => {
  describe("Given: another function", () => {
    let decorator: any;
    let func: any;

    beforeEach(() => {
      func = (val: 'foo') => undefined;
      decorator = setter(func);
    });

    afterEach(() => {
      func = undefined;
      decorator = undefined
    });

    describe('When: called', () => {
      describe('Then: the "setter" function', () => {
        it('should return a property descriptor decorator', () => {
          expect(typeof decorator).toBe('function');
        });
      });

      describe('The property descriptor decorator returned from the "setter" function:', () => {
        describe("Given: a property descriptor", () => {
          describe("When: called", () => {
            describe('Then: a "set" property', () => {
              it('should exist on the descriptor and be set to the function provided to the "setter" function"', () => {
                let descriptor = {} as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.set).toBe(func);
              });
            });

            describe('Then: a "value" property, if one exists on the descriptor', () => {
              it('should be removed', () => {
                let descriptor = { value: 'foo ' } as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.value).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});
