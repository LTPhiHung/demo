import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DetailQuestPage from './pages/Detail/DetailQuestPage';
import MainLayout from './pages/MainLayout';
import QuestListPage from './pages/List/QuestListPage';
import { questLoader } from './loaders/questLoader';
import QuestReQuestListPage from './pages/List/QuestReQuestListPage';
import DetailQuestRequestPage from './pages/Detail/DetailQuestReQuestPage';
import WelcomeQuestListPage from './pages/List/WelcomeQuestListPage';
import DetailWelcomeQuestPage from './pages/Detail/DetailWelcomeQuestPage';
import NotFoundPage from './pages/NotfoundPage';
import RedeemListPage from './pages/List/RedeemListPage';
import ReemDetailPage from './pages/Detail/ReemDetailPage';
import CreateQuestPage from './pages/Create/CreateQuestPage';
import CreateWelcomeQuestPage from './pages/Create/CreateWelcomeQuestPage';
import CreateRedeemPage from './pages/Create/CreateRedeemPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'quest',
        element: <QuestListPage />,
        loader: questLoader, // gắn loader vào route
      },
      {
        path: 'point-request',
        element: <QuestReQuestListPage />,
      },
      {
        path: 'quest/create',
        element: <CreateQuestPage />,
      },
      {
        path: 'quest/:id',
        element: <DetailQuestPage />,
      },
      {
        path: 'point-request/:id',
        element: <DetailQuestRequestPage />,
      },
      {
        path: 'welcome-quest',
        element: <WelcomeQuestListPage />,
      },
      {
        path: 'welcome-quest/create',
        element: <CreateWelcomeQuestPage />,
      },
      {
        path: 'welcome-quest/:id',
        element: <DetailWelcomeQuestPage />,
      },
      {
        path: 'redeem',
        element: <RedeemListPage />,
      },
      {
        path: 'redeem/create',
        element: <CreateRedeemPage />,
      },
      {
        path: 'redeem/:id',
        element: <ReemDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
