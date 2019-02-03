import { isFutureDate } from '../dateValidation';
import moment = require('moment-timezone');

describe('#isFutureDate', () => {
  it('returns false when passed date is in the past', () => {
    const pastDate = moment().subtract(1, 'years');
    const result = isFutureDate(pastDate.toDate());
    expect(result).toEqual(false);
  });

  it('returns false when passed invalid value', () => {
    const result = isFutureDate(undefined);
    expect(result).toEqual(false);
  });

  it('return true when passed date is in the future', () => {
    const futureDate = moment().add(1, 'years');
    const result = isFutureDate(futureDate.toDate());
    expect(result).toEqual(true);
  });
});
