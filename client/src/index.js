import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Login from './pages/Login'
import CreateAcc from './pages/CreateAcc';
import PublicLists from './pages/PublicLists';
import EmailVerification from './pages/EmailVerification'
import AdminPriv from './pages/AdminPriv';
import ListManagement from './pages/ListManagement'
import Policy from './pages/Policy';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export const UserContext = React.createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  }, 
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/create-account",
    element: <CreateAcc/>
  },
  {
    path: "/create-account/login",
    element: <Login/>
  }, 
  {
    path: "/public-lists",
    element: <PublicLists/>
  }, 
  {
    path: "/public-lists/login",
    element: <Login/>
  }, 
  {
    path: "/verify/:token",
    element: <EmailVerification/>
  },
  {
    path: "/verify/:token/login",
    element: <Login/>
  },
  {
    path: "/admin-priv",
    element: <AdminPriv/>
  },
  {
    path: "/list-manage",
    element: <ListManagement/>
  },
  {
    path: "/policy",
    element: <Policy/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);