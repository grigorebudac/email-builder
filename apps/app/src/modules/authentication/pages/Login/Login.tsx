import React from 'react';
import Head from 'next/head';
import useAuth from '../../hooks/useAuth';
import { LoginForm } from '../../components/Forms/LoginForm';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';

const Login = () => {
  const { error, onLogIn, onLoginWithMicrosoft } = useAuth();

  return (
    <>
      <Head>
        <title>Log in</title>
      </Head>
      <AuthenticationLayout
        withLogo
        title="Welcome back"
        subtitle="Please enter your details"
      >
        <LoginForm
          error={error}
          onSubmit={onLogIn}
          onMicrosoftSignIn={onLoginWithMicrosoft}
        />
      </AuthenticationLayout>
    </>
  );
};

export default Login;
