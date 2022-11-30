import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { withPublicRoute } from '@/hocs/withPublicRoute';
import { Auth } from '../../types/auth.types';
import {
  Auth as AmplifyAuth,
  CognitoHostedUIIdentityProvider,
} from '@aws-amplify/auth';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';

const Register = () => {
  const router = useRouter();
  const [registerError, setRegisterError] = useState('');

  async function handleRegister(credentials: Auth.RegisterRequestPayload) {
    try {
      await AmplifyAuth.signUp({
        username: credentials.email,
        password: credentials.password,
        autoSignIn: {
          enabled: true,
        },
      });
      router.push('/');
    } catch (error) {
      error instanceof Error
        ? setRegisterError(error.message)
        : setRegisterError('');
    }
  }

  const handleSignInWithMicrosoft = useCallback(() => {
    AmplifyAuth.federatedSignIn({
      provider: 'Microsoft' as CognitoHostedUIIdentityProvider,
    });
  }, []);

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
          error={registerError}
          onSubmit={handleRegister}
          onMicrosoftSignIn={handleSignInWithMicrosoft}
        />
      </AuthenticationLayout>
    </>
  );
};

export default withPublicRoute(Register);
