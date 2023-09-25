export function getHumanTime(timestamp: number) {
  const difference = timestamp - Date.now();
  const time = Math.abs(difference);

  const units = [
    { label: 'year', duration: 1000 * 60 * 60 * 24 * 365 },
    { label: 'month', duration: 1000 * 60 * 60 * 24 * 30 },
    { label: 'week', duration: 1000 * 60 * 60 * 24 * 7 },
    { label: 'day', duration: 1000 * 60 * 60 * 24 },
    { label: 'hour', duration: 1000 * 60 * 60 },
    { label: 'minute', duration: 1000 * 60 },
    { label: 'second', duration: 1000 },
  ];

  let result = 'just now';

  units.every((unit) => {
    if (time >= unit.duration) {
      const count = Math.floor(time / unit.duration);
      result = `${difference > 0 ? 'in ' : ''}${count} ${unit.label}${count === 1 ? '' : 's'}${
        difference > 0 ? '' : ' ago'
      }`;
      return false;
    }
    return true;
  });

  return result;
}
