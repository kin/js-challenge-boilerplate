import { DescriptorDecorator } from './object-props.type';

export function initialValue(
  val: any,
): DescriptorDecorator {
  return function (descriptor: PropertyDescriptor): PropertyDescriptor {
    descriptor = {
      ...descriptor,
      value: val,
    };
    delete descriptor.get;
    delete descriptor.set;

    return descriptor;
  };
}

export function editable(descriptor: PropertyDescriptor): PropertyDescriptor {
  return {
    ...descriptor,
    writable: true,
  };
}

export function readOnly(descriptor: PropertyDescriptor): PropertyDescriptor {
  if (descriptor.value !== undefined) {
    return {
      ...descriptor,
      writable: false,
    };
  }
  return descriptor;
}

export function method(val: any): DescriptorDecorator {
  return function (descriptor: PropertyDescriptor): PropertyDescriptor {
    if (typeof val === 'function') {
      descriptor = {
        ...descriptor,
        value: val,
        writable: false,
      };
      delete descriptor.get;
      delete descriptor.set;
    }

    return descriptor;
  };
}
