import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
};
