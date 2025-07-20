/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteWatcher() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login') {
      alert('alerte');
    }
  }, [location.pathname]);

  return null;
}
