import { withPublicRoute } from '@/hocs/withPublicRoute';
import React from 'react';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';
import Head from 'next/head';
import useAuth from '../../hooks/useAuth';

const ForgotPassword = () => {
  const { onForgetPassword } = useAuth();

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <AuthenticationLayout
        title="Forgot password?"
        subtitle="Insert your email to reset the password"
      >
        <ForgotPasswordForm onSubmit={onForgetPassword} />
      </AuthenticationLayout>
    </>
  );
};

export default withPublicRoute(ForgotPassword);
