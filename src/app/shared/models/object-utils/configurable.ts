export function configurable(
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  return {
    ...descriptor,
    configurable: true
  };
}

export const overridable = configurable;
