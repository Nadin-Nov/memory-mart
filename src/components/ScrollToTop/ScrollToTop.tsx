import type { JSX } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const DELAY = 50;
const ScrollToTop = (): JSX.Element => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, DELAY);

    return (): void => clearTimeout(timeout);
  }, [pathname]);

  return <></>;
};

export default ScrollToTop;
