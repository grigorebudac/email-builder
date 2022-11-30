import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Auth as AmplifyAuth,
  CognitoHostedUIIdentityProvider,
} from '@aws-amplify/auth';
import { Auth } from '../../types/auth.types';
import { withPublicRoute } from '@/hocs/withPublicRoute';
import { LoginForm } from '../../components/Forms/LoginForm';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  async function handleSignIn(credentials: Auth.LoginRequestPayload) {
    try {
      await AmplifyAuth.signIn(credentials.email, credentials.password);
      router.push('/');
    } catch (error) {
      error instanceof Error ? setLoginError(error.message) : setLoginError('');
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
        <title>Log in</title>
      </Head>
      <AuthenticationLayout
        withLogo
        title="Welcome back"
        subtitle="Please enter your details"
      >
        <LoginForm
          onSubmit={handleSignIn}
          error={loginError}
          onMicrosoftSignIn={handleSignInWithMicrosoft}
        />
      </AuthenticationLayout>
    </>
  );
};

export default withPublicRoute(Login);
