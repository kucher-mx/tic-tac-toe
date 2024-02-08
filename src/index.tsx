import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// consts
import { routes } from './shared/consts/routes';

// providers
import { ThemeProvider } from './providers/theme/theme.provider';

// styles
import './shared/styles/colors.module.css';

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
