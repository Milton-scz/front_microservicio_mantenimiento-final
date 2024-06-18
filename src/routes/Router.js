import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../Loadable';

const Activos = Loadable(lazy(() => import('../views/Mantenimiento/mantenimiento')))
const Router = [
  {
    path: '/',
    children: [
      { path: '/', element: <Navigate to="/Home" /> },
      { path: '/Mantenimientos', exact: true, element: <Activos /> },
    ],
  }
];

export default Router;
