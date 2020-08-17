import { useEffect, useRef } from 'react';
import { isNil } from 'ramda';

// Thanks to Dan Abramov
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      if (!isNil(savedCallback.current)) savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
