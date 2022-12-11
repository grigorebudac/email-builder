import React from 'react';
import Head from 'next/head';
import useAuth from '../../hooks/useAuth';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';

const Register = () => {
  const { error, onSignUp, onLoginWithMicrosoft } = useAuth();

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
          onSubmit={onSignUp}
          onMicrosoftSignIn={onLoginWithMicrosoft}
        />
      </AuthenticationLayout>
    </>
  );
};

export default Register;
