import React from 'react';
import { withPublicRoute } from '@/hocs/withPublicRoute';
import { AuthenticationSection } from '../../sections/AuthenticationSection';
import { InitialAuthSection } from '../../types/auth.types';

const Login = () => {
  return <AuthenticationSection initial={InitialAuthSection.Login} />;
};

export default withPublicRoute(Login);
