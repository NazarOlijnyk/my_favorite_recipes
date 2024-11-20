import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'

import './index.css';
import Root from './pages/Root.tsx';
import Error from './pages/Error/index.tsx';
import Meal from './pages/Meal/index.tsx';
import Home from './pages/Home/index.tsx';
import Basket from './pages/Basket/index.tsx';

import { store } from './store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "meal/:mealId",
        element: <Meal />,
      },
      {
        path: "basket",
        element: <Basket />
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
