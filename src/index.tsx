import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// consts
import { routes } from './shared/consts/routes';

// providers
import { ThemeProvider } from './providers/theme/theme.provider';
import { GameProvider } from './providers/game/game.provider';

// styles
import './shared/styles/colors.module.css';
import './shared/styles/reset.module.css';
import { AppProvider } from './providers/app/app.provider';

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider>
        <GameProvider>
          <RouterProvider router={router} />
        </GameProvider>
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>,
);
