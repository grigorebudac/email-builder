import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import SimpleAuthenticationLayout from '../../components/Layouts/SimpleAuthenticationLayout';
import { Auth } from '../../types/auth.types';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';

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
    <SimpleAuthenticationLayout title="Forgot Password">
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </SimpleAuthenticationLayout>
  );
};

export default withPublicRoute(ForgotPassword);
