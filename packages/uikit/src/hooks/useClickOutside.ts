import React, { useCallback, useEffect, useRef, useState } from 'react';

const useClickOutside = (): [
  React.LegacyRef<HTMLElement> | undefined,
  boolean,
] => {
  const [isClick, setIsClick] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleClick = useCallback(
    (e: Event) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsClick(true);
      }
    },
    [ref, setIsClick],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsClick(false), 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [isClick, setIsClick]);

  return [ref, isClick];
};

export { useClickOutside };
