import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// consts
import { routes } from './shared/consts/routes';

// providers
import { ThemeProvider } from './providers/theme/theme.provider';
import { GameProvider } from './providers/game/game.provider';
import { UserProvider } from './providers/user/user.provider';
import { AppProvider } from './providers/app/app.provider';

// styles
import './shared/styles/colors.module.css';
import './shared/styles/reset.module.css';

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <ThemeProvider>
          <GameProvider>
            <RouterProvider router={router} />
          </GameProvider>
        </ThemeProvider>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>,
);
