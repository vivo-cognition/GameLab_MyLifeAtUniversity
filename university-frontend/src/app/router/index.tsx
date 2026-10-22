import { createBrowserRouter } from 'react-router-dom';
import { MainMenuPage } from '../../pages/main-menu';
import { StartPage } from '../../pages/start-page';
import { GamePage } from '../../pages/game-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenuPage />,
  },
  {
    path: '/start',
    element: <StartPage />,
  },
  {
    path: '/game',
    element: <GamePage/>,
  }
]);
