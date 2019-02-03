import { isString } from '../util/stringHelper';

export function isPhone(value?: string) {
  if (!isString(value)) {
    return false;
  }
  return /^[\s()+-]*([0-9][\s()+-]*){6,20}$/.test(value);
}
