export function enumerable(
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  return {
    ...descriptor,
    enumerable: true
  };
}
