import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import { Suspense } from 'react';

import ScrollTop from 'components/ScrollTop';
import { Toaster } from 'react-hot-toast';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const Loading = () => {
    return <div>Loading...</div>;
  };
  return (
    <ThemeCustomization>
      <ScrollTop>
        <Suspense fallback={<Loading />}>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: '#363636',
                color: '#fff'
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: 'green',
                  secondary: 'black'
                }
              }
            }}
          />
          <RouterProvider router={router} />
        </Suspense>
      </ScrollTop>
    </ThemeCustomization>
  );
}
