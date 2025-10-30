import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddQuestPage from './pages/AddQuestPage';
import MainLayout from './pages/MainLayout';
import QuestListPage from './pages/QuestListPage';
import { questLoader } from './loaders/questLoader';

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
        path: 'add',
        element: <AddQuestPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
