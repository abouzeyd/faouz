/* eslint-disable prettier/prettier */
import RouteWatcher from './RouterWatcher';

export default function MainLayout({ children }) {
  return (
    <>
      <RouteWatcher />
      {/* ...le reste de ton layout... */}
      {children}
    </>
  );
}
