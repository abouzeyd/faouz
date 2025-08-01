import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import { Suspense } from 'react';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const Loading = () => {
    return <div>Loading...</div>;
  };
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </ScrollTop>
    </ThemeCustomization>
  );
}
