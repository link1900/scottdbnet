import { randomInteger, randomIntegerArray } from '../randomHelper';
import { groupArray } from '../arrayHelper';

describe('randomInteger', () => {
  it('gets a random integer between min integer and max integer', () => {
    const result = randomInteger();
    expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
    expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  });

  it('gets a random integer between provided min and max', () => {
    const result = randomInteger(0, 100);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it('gets a random integer 0, 1', () => {
    const result = randomInteger(0, 1);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('gets an even distribution', () => {
    let i = 0;
    const results = [];
    while (i < 10000) {
      results.push(randomInteger(0, 1));
      i++;
    }

    const result = groupArray(results);
    expect(result.length).toEqual(2);
    const zeros = result.find(g => g.key === 0);
    const ones = result.find(g => g.key === 1);

    expect(zeros && zeros.values.length).toBeGreaterThan(4500);
    expect(zeros && zeros.values.length).toBeLessThan(5500);

    expect(ones && ones.values.length).toBeGreaterThan(4500);
    expect(ones && ones.values.length).toBeLessThan(5500);
  });
});

describe('randomIntegerArray', () => {
  it('gets a random array of integers', () => {
    const result = randomIntegerArray(5, 0, 10);
    expect(result.length).toEqual(5);
    expect(result.every(i => i >= 0 && i <= 10)).toEqual(true);
  });

  it('gets an even distribution', () => {
    const results = randomIntegerArray(10000, 0, 1);
    const result = groupArray(results);
    expect(result.length).toEqual(2);
    const zeros = result.find(g => g.key === 0);
    const ones = result.find(g => g.key === 1);

    expect(zeros && zeros.values.length).toBeGreaterThan(4500);
    expect(zeros && zeros.values.length).toBeLessThan(5500);

    expect(ones && ones.values.length).toBeGreaterThan(4500);
    expect(ones && ones.values.length).toBeLessThan(5500);
  });
});
