import InternalServerError from '../error/InternalServerError';

export function unwrap<T>(value: T | undefined | null): T {
  if (value === null || value === undefined) {
    throw new InternalServerError('Attempted to unwrap value but was null or undefined');
  }
  return value;
}

export function exists<T>(value?: T): boolean {
  return !(value === null || value === undefined);
}
