export type ObjectProps<T> = {
    [p in keyof T]: PropertyDescriptor;
};

export type DescriptorDecorator = (
    descriptor: PropertyDescriptor
) => PropertyDescriptor;
