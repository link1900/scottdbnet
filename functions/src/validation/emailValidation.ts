import joi from 'joi';
import { isString } from '../util/stringHelper';

export function isEmail(value?: any) {
    if (!isString(value)) {
        return false;
    }
    try {
        joi.assert(value, joi.string().email());
        return true;
    } catch (error) {
        return false;
    }
}
