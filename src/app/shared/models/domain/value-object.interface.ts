export interface ValueObject<T, V>
  extends ValueObjectFn<V> {
  equals(other: T): boolean;
}

type ValueObjectFn<T> = () => T;
