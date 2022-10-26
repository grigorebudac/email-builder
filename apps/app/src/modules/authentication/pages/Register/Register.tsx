import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import { AuthenticationSection } from '../../sections/AuthenticationSection';
import { InitialAuthSection } from '../../types/auth.types';

const Register = () => {
  return <AuthenticationSection initial={InitialAuthSection.Register} />;
};

export default withPublicRoute(Register);
