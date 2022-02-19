import * as React from 'react';

export const usePrevious = <T>(value: T): T => {
  const ref: any = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
