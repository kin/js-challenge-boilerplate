import { enumerable } from './enumerable';

describe('The "enumerable" decorator function:', () => {
  describe('Given: a property descriptor', () => {
    describe('Then: an "enumerable" property', () => {
      it('should exist on the descriptor and be set to "true"', () => {
        let descriptor = {} as PropertyDescriptor;

        descriptor = enumerable(descriptor);

        expect(descriptor.enumerable).toBe(true);
      });
    });
  });
});
