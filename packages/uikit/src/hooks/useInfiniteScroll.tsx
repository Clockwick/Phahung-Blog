/* eslint-disable */
import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);

  useEffect(() => {
    if (isFetching) callback();
  }, [isFetching, setIsFetching]);

  const isScrolling = (): void => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  };

  return [isFetching, setIsFetching] as const;
};

export { useInfiniteScroll };
