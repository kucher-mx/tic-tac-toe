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
import { ToasterProvider } from './providers/toaster/toaster.provider';
import { AppWrapper } from './components/app-wrapper/app-wrapper';

// styles
import './shared/styles/colors.module.css';
import './shared/styles/reset.module.css';

const router = createBrowserRouter(routes);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ToasterProvider>
      <AppProvider>
        <UserProvider>
          <ThemeProvider>
            <GameProvider>
              <AppWrapper>
                <RouterProvider router={router} />
              </AppWrapper>
            </GameProvider>
          </ThemeProvider>
        </UserProvider>
      </AppProvider>
    </ToasterProvider>
  </React.StrictMode>,
);
