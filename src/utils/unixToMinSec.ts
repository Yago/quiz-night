import { format, fromUnixTime } from 'date-fns';
import { isNil } from 'ramda';

export default timestamp => {
  if (isNil(timestamp)) return;
  const time = fromUnixTime(timestamp / 1000);
  return format(time, 'mm:ss');
};
