import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Archive from './views/Archive/Archive'
import Dashboard from './views/Dashboard/Dashboard'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "history",
        element: <Archive />
      },
      {
        path: "/",
        element: <Dashboard />
      }
    ]
  }
])

const rootElement = ReactDOM.createRoot(document.getElementById('root'));
rootElement.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);