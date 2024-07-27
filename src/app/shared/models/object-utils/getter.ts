import { DescriptorDecorator } from './object-props.type';

export function getter(
  getterFn: () => any,
): DescriptorDecorator {
  return function (descriptor: PropertyDescriptor): PropertyDescriptor {
    descriptor = {
      ...descriptor,
      get: getterFn,
    };

    delete descriptor.value;

    return descriptor;
  };
}
