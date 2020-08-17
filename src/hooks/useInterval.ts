import { useEffect, useRef } from 'react';

// Thanks to Dan Abramov
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
