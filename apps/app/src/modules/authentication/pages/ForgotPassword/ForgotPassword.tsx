import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import { Auth } from '../../types/auth.types';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';
import Head from 'next/head';
import useToast from '@/hooks/useToast';

const ForgotPassword = () => {
  const router = useRouter();
  const { onShowToast } = useToast();

  async function handleSubmit(credentials: Auth.ForgotPassword) {
    try {
      await AmplifyAuth.forgotPassword(credentials.email);
      router.push('/login');
      onShowToast('An email with reset link was sent!', 'info');
    } catch (error) {
      alert('Incorrect email');
    }
  }

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <AuthenticationLayout
        title="Forgot password?"
        subtitle="Insert your email to reset the password"
      >
        <ForgotPasswordForm onSubmit={handleSubmit} />
      </AuthenticationLayout>
    </>
  );
};

export default withPublicRoute(ForgotPassword);
