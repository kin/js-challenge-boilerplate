import { enumerable } from './enumerable';
import { DescriptorDecorator } from './object-props.type';

export function prop(...fns: DescriptorDecorator[]): PropertyDescriptor {
  return fns.reduce((descriptor, fn) => {
    return fn(descriptor);
  }, enumerable({}));
}
