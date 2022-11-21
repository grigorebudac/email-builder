import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth, InitialAuthSection } from '../../types/auth.types';
import { AuthenticationLayout } from '../../components/Layouts/AuthenticationLayout';
import { LoginForm } from '../../components/Forms/LoginForm';
import { RegisterForm } from '../../components/Forms/RegisterForm';
import {
  Auth as AmplifyAuth,
  CognitoHostedUIIdentityProvider,
} from '@aws-amplify/auth';

type AuthenticationSectionProps = {
  initial: InitialAuthSection;
};

const AuthenticationSection: React.FC<AuthenticationSectionProps> = ({
  initial,
}) => {
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const router = useRouter();

  async function handleSignIn(credentials: Auth.LoginRequestPayload) {
    try {
      await AmplifyAuth.signIn(credentials.email, credentials.password);
      router.push('/');
    } catch (error) {
      error instanceof Error ? setLoginError(error.message) : setLoginError('');
    }
  }

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
    <AuthenticationLayout
      loginSection={<LoginForm onSubmit={handleSignIn} error={loginError} />}
      registerSection={
        <RegisterForm onSubmit={handleRegister} error={registerError} />
      }
      initial={initial}
      onLoginWithMicrosoft={handleSignInWithMicrosoft}
    />
  );
};

export { AuthenticationSection };
