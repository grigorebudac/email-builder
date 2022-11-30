import React from 'react';
import Head from 'next/head';
import { withPublicRoute } from '@/hocs/withPublicRoute';
import useAuth from '../../hooks/useAuth';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';

const Register = () => {
  const { error, onSignIn, onLoginWithMicrosoft } = useAuth();

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <AuthenticationLayout
        withLogo
        title="Welcome to LEGO Mail"
        subtitle="An easy way to build an email"
      >
        <RegisterForm
          error={error}
          onSubmit={onSignIn}
          onMicrosoftSignIn={onLoginWithMicrosoft}
        />
      </AuthenticationLayout>
    </>
  );
};

export default withPublicRoute(Register);
