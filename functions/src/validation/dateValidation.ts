import moment from 'moment-timezone';

export function isFutureDate(date?: Date) {
    if (!date) {
        return false;
    }
    return moment().isSameOrBefore(date);
}
