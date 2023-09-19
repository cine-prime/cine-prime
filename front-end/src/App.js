import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from 'react-router-dom';

import Singup from './pages/Singup';
import Singin from './pages/Singin';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFroundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/cadastro',
    element: <Singup />,
  },
  {
    path: '/login',
    element: <Singin />,
  },
]);

function App() {
  return (
   //<Singup />
   //<Singin />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App;
