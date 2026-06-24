import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    // Component triggers window scroll to top instantly on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}