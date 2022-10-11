import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import { AuthenticationSection } from '../../sections/AuthenticationSection';

const Register = () => {
  return <AuthenticationSection initial={'register'} />;
};

export default withPublicRoute(Register);
