import { format, fromUnixTime } from 'date-fns';
import { isNil } from 'ramda';

export default (timestamp: number): string | null => {
  if (isNil(timestamp)) return null;
  const time = fromUnixTime(timestamp / 1000);
  return format(time, 'mm:ss');
};
