import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import { Auth } from '../../types/auth.types';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';

const ForgotPassword = () => {
  const router = useRouter();

  async function handleSubmit(credentials: Auth.ForgotPassword) {
    try {
      await AmplifyAuth.forgotPassword(credentials.email);
      router.push('/');
    } catch (error) {
      alert('Incorrect email');
    }
  }
  return (
    <AuthenticationLayout>
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </AuthenticationLayout>
  );
};

export default withPublicRoute(ForgotPassword);
