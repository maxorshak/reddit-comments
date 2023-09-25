import { getHumanTime } from './getHumanTime';

describe('getHumanTime function', () => {
  it('displays "just now" when the timestamp is the same as Date.now()', () => {
    const timestamp = Date.now();
    const result = getHumanTime(timestamp);
    expect(result).toBe('just now');
  });

  it('displays time ago when the timestamp is in the past', () => {
    const timestamp = Date.now() - 1000 * 60 * 5; // 5 minutes ago
    const result = getHumanTime(timestamp);
    expect(result).toMatch(/5 minutes ago/);
  });

  it('displays time in the future when the timestamp is in the future', () => {
    const timestamp = Date.now() + 1000 * 60 * 60 * 10; // 10 minutes from now
    const result = getHumanTime(timestamp);
    expect(result).toMatch(/in 10 hours/);
  });

  it('correctly calculates time units', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 24 * 7; // 1 week ago
    const result = getHumanTime(timestamp);
    expect(result).toMatch(/1 week ago/);
  });
});
