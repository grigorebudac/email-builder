import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import { AuthenticationSection } from '../../sections/AuthenticationSection';
const Login = () => {
  return <AuthenticationSection initial={'login'} />;
};

export default withPublicRoute(Login);
