import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddQuestPage from './pages/AddQuestPage';
import MainLayout from './pages/MainLayout';
import QuestListPage from './pages/QuestListPage';
import { questLoader } from './loaders/questLoader';
import QuestReQuestListPage from './pages/QuestReQuestListPage';
import DetailQuestRequestPage from './pages/DetailQuestReQuestPage';
import WelcomeQuestListPage from './pages/WelcomeQuestListPage';

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
        path: 'add',
        element: <AddQuestPage />,
      },
      {
        path: 'quest/:id',
        element: <AddQuestPage />,
      },
      {
        path: 'point-request/:id',
        element: <DetailQuestRequestPage />,
      },
      {
        path: 'welcome-quest',
        element: <WelcomeQuestListPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
