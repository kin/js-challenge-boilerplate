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
  if (descriptor.value !== undefined) {
    return {
      ...descriptor,
      writable: true,
    };
  }
  return descriptor;
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
    descriptor = {
      value: val,
      writable: false,
    };
    delete descriptor.get;
    delete descriptor.set;

    return descriptor;
  };
}
