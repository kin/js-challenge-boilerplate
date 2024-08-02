import { policyNumber } from './policy-number';

describe('The "policyNumber" function:', () => {
  describe('Given: a candidate policy number', () => {
    describe('When: candidate is not a number comprised of nine digits', () => {
      describe('Them: an Exception', () => {
        it('should be thrown', () => {
          expect(test).toThrow();

          function test() {
            policyNumber(123);
          }
        });
      });
    });
  });

  describe('Given: a candidate policy number', () => {
    describe('When: the candidate does not meet the validation requirements', () => {
      describe('Them: an Exception', () => {
        it('should be thrown', () => {
          expect(test).toThrow();

          function test() {
            policyNumber(111111111);
          }
        });
      });
    });
  });

  describe('Given: a candidate policy number', () => {
    describe('When: the candidate meets the validation requirements', () => {
      describe('Them: a new PolicyNumber', () => {
        it('should be created', () => {
          const candidate = 123456789;

          expect(policyNumber(candidate)).toBeDefined();
        });

        it('should be a funtion that returns the validated policy number', () => {
          const candidate = 123456789;
          const p123456789 = policyNumber(candidate);

          expect(typeof p123456789).toBe('function');
          expect(p123456789()).toBe(candidate);
        });

        describe('The "equals" method on the new policy number:', () => {
          describe('Given: another object', () => {
            describe('When: the other object is not a policy number', () => {
              describe('Then: the "equals" method', () => {
                it('should return false', () => {
                  const p1 = policyNumber(123456789);
                  const p2 = {} as any;

                  expect(p1.equals(p2)).toBe(false);
                });
              });

              describe('When: the other object is a valid policy number that does not match the original policy number', () => {
                describe('Then: the "equals" method', () => {
                  it('should return false', () => {
                    const p1 = policyNumber(123456789);
                    const p2 = policyNumber(106904132);

                    expect(p1.equals(p2)).toBe(false);
                  });
                });
              });

              describe('When: the other object is a valid policy number that matches the original policy number', () => {
                describe('Then: the "equals" method', () => {
                  it('should return true', () => {
                    const p1 = policyNumber(123456789);
                    const p2 = policyNumber(123456789);

                    expect(p1.equals(p2)).toBe(true);
                  });
                });
              })
            });
          });
        });
      });

    });
  });
});