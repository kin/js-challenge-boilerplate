import { configurable } from './configurable';

describe('The "configurable" decorator function:', () => {
  describe('Given: a property descriptor', () => {
    describe('When: the function is called', () => {
      describe('Then: an "configurable" property', () => {
        it('should exist on the descriptor and be set to "true"', () => {
          let descriptor = {} as PropertyDescriptor;

          descriptor = configurable(descriptor);

          expect(descriptor.configurable).toBe(true);
        });
      });
    });
  });
});
