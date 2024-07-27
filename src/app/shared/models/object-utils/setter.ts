import { DescriptorDecorator } from './object-props.type';

export function setter(
  setterFn: (...args: any[]) => any,
): DescriptorDecorator {
  return function (descriptor: PropertyDescriptor): PropertyDescriptor {
    descriptor = {
      ...descriptor,
      set: setterFn
    };
    delete descriptor.value;

    return descriptor;
  };
}
