import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { withPublicRoute } from '@/hocs/withPublicRoute';
import { LoginForm } from '../../components/Forms/LoginForm';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';
import { Auth } from '../../types/auth.types';

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

  return (
    <AuthenticationLayout
      withLogo
      title="Welcome back"
      subtitle="Please enter your details"
    >
      <LoginForm onSubmit={handleSignIn} error={loginError} />
    </AuthenticationLayout>
  );
};

export default withPublicRoute(Login);
