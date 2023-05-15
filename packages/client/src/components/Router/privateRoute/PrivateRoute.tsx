import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouteProps } from '../../../interface/Router';

export function PrivateRoute({ loggedIn }: RouteProps) {
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}
