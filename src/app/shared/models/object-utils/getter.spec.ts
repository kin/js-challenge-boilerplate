import { getter } from './getter';

describe('The "getter" function:', () => {
  describe("Given: another function", () => {
    let decorator: any;
    let func: any;

    beforeEach(() => {
      func = () => 'foo';
      decorator = getter(func);
    });

    afterEach(() => {
      func = undefined;
      decorator = undefined
    });

    describe('When: called', () => {
      describe('Then: the "getter" function', () => {
        it('should return a property descriptor decorator', () => {
          expect(typeof decorator).toBe('function');
        });
      });

      describe('The property descriptor decorator returned from the "getter" function:', () => {
        describe("Given: a property descriptor", () => {
          describe("When: called", () => {
            describe('Then: a "get" property', () => {
              it('should exist on the descriptor and be set to the function provided to the "getter" function', () => {
                let descriptor = {} as PropertyDescriptor;
  
                descriptor = decorator(descriptor);
  
                expect(descriptor.get).toBe(func);
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
