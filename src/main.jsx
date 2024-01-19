import React from 'react';
import ReactDOM from 'react-dom/client';
import "./css/normalize.css";
import './css/main.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './routes/root.jsx';
import ErrorPage from './error-page.jsx';
import Login from './routes/login.jsx';
import Profile from './routes/profile.jsx';
import Home from './routes/home.jsx';
import userLoader from './auth/userLoader.jsx';
import { CookiesProvider } from 'react-cookie';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: userLoader,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  }
  // createRoutesFromElements(
  //   <Route
  //     path="/"
  //     element={<Root />}
  //     errorElement={<ErrorPage />}
  //   >
  //     <Route index element={<Home />} />
  //     <Route path="/login" element={<Login />} />
  //     <Route path="/profile" element={<Profile />} loader={profileLoader} />
  //   </Route>
  // )
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
