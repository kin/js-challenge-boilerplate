import { initialValue, editable, method, readOnly } from './value';

describe('The "initialValue" function:', () => {
  describe("Given: some value", () => {
    let decorator: any;
    let val: any;

    beforeEach(() => {
      val = 'foo';
      decorator = initialValue(val);
    });

    afterEach(() => {
      val = undefined;
      decorator = undefined
    });

    describe('When: called', () => {
      describe('Then: the "initialValue" function', () => {
        it('should return a property descriptor decorator', () => {
          expect(typeof decorator).toBe('function');
        });
      });

      describe('The property descriptor decorator returned from the "initialValue" function:', () => {
        describe("Given: a property descriptor", () => {
          describe("When: called", () => {
            describe('Then: a "value" property', () => {
              it('should exist on the descriptor and be set to the value provided to the "initialValue" function"', () => {
                let descriptor = {} as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.value).toBe(val);
              });
            });

            describe('Then: a "get" property, if one exists on the descriptor', () => {
              it('should be removed', () => {
                let descriptor = { get: () => 'foo ' } as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.get).toBeUndefined();
              });
            });

            describe('Then: a "set" property, if one exists on the descriptor', () => {
              it('should be removed', () => {
                let descriptor = { set: (val: 'foo') => undefined } as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.set).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

describe('The "method" function:', () => {
  describe("Given: another function", () => {
    let decorator: any;
    let func: any;

    beforeEach(() => {
      func = () => 'foo';
      decorator = method(func);
    });

    afterEach(() => {
      func = undefined;
      decorator = undefined
    });

    describe('When: called', () => {
      describe('Then: the "method" function', () => {
        it('should return a property descriptor decorator', () => {
          expect(typeof decorator).toBe('function');
        });
      });

      describe('The property descriptor decorator returned from the "method" function:', () => {
        describe('Given: a property descriptor', () => {
          describe('When: called', () => {
            describe('Then: a "value" property', () => {
              it('should exist on the descriptor and be set to the value provided to the "method" function', () => {
                let descriptor = {} as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.value).toBe(func);
              });
            });

            describe('Then: a "get" property, if one exists on the descriptor', () => {
              it('should be removed', () => {
                let descriptor = { get: () => 'foo ' } as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.get).toBeUndefined();
              });
            });

            describe('Then: a "set" property, if one exists on the descriptor', () => {
              it('should be removed', () => {
                let descriptor = { set: (val: 'foo') => undefined } as PropertyDescriptor;

                descriptor = decorator(descriptor);

                expect(descriptor.set).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });

  describe("Given: a value that is not a function", () => {
    let decorator: any;
    let func: any;

    beforeEach(() => {
      func = 'foo';
      decorator = method(func);
    });

    afterEach(() => {
      func = undefined;
      decorator = undefined
    });

    describe('When: called', () => {
      describe('Then: the "method" function', () => {
        it('should return a property descriptor decorator', () => {
          expect(typeof decorator).toBe('function');
        });
      });

      describe('The property descriptor decorator returned from the "method" function:', () => {
        describe('Given: a property descriptor', () => {
          describe('When: called', () => {
            describe('Then: the given property descriptor',  () => {
              it('should should be returned and be unchanged', () => {
                const old = { value: 'foo' } as PropertyDescriptor;
                const descriptor = decorator(old);

                expect(descriptor).toBe(old);
              });
            });
          });
        });
      });
    });
  });
});

describe('The "editable" decorator function:', () => {
  describe('Given: a property descriptor with a "value" property', () => {
    describe('When: the "editable" decorator function is called', () => {
      describe('Then: a "writable" property', () => {
        it('should exist on the descriptor and be set to "true"', () => {
          let descriptor = { value: 'foo' } as PropertyDescriptor;

          descriptor = editable(descriptor);

          expect(descriptor.writable).toBe(true);
        });
      });
    });
  });


  describe('Given: a property descriptor without a "value" property', () => {
    describe('When: the "readOnly" decorator function is called', () => {
      describe('Then: a "writable" property', () => {
        it('should not exist on the descriptor', () => {
          let descriptor = {} as PropertyDescriptor;

          descriptor = readOnly(descriptor);

          expect(descriptor.writable).toBeUndefined();
        });
      });
    });
  });
});

describe('The "readOnly" decorator function:', () => {
  describe('Given: a property descriptor with a "value" property', () => {
    describe('When: the "readOnly" decorator function is called', () => {
      describe('Then: a "writable" property', () => {
        it('should exist on the descriptor and be set to "false"', () => {
          let descriptor = { value: 'foo' } as PropertyDescriptor;

          descriptor = readOnly(descriptor);

          expect(descriptor.writable).toBe(false);
        });
      });
    })
  });

  describe('Given: a property descriptor with no "value" property', () => {
    describe('When: the "readOnly" decorator function is called', () => {
      describe('Then: a "writable" property', () => {
        it('should not exist on the descriptor', () => {
          let descriptor = {} as PropertyDescriptor;

          descriptor = readOnly(descriptor);

          expect(descriptor.writable).toBeUndefined();
        });
      });
    });
  });
});

