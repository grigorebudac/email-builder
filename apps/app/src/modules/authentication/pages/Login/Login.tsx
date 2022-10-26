import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import { AuthenticationSection } from '../../sections/AuthenticationSection';
import { InitialAuthSection } from '../../types/auth.types';
const Login = () => {
  return <AuthenticationSection initial={InitialAuthSection.Login} />;
};

export default withPublicRoute(Login);
