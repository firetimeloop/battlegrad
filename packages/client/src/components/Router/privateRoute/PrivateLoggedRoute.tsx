import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateLoggedRouteProps {
  loggedIn: boolean
}

export function PrivateLoggedRoute({ loggedIn }: PrivateLoggedRouteProps) {
  return loggedIn ? <Navigate to="/" /> : <Outlet />;
}
