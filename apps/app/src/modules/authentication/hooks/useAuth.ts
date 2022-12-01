import { useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '../types/auth.types';
import {
  Auth as AmplifyAuth,
  CognitoHostedUIIdentityProvider,
} from '@aws-amplify/auth';
import useToast from '../../../hooks/useToast';

function useAuth() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const { showToast } = useToast();

  async function handleSignUp(credentials: Auth.RegisterRequestPayload) {
    try {
      await AmplifyAuth.signUp({
        username: credentials.email,
        password: credentials.password,
        autoSignIn: {
          enabled: true,
        },
      });
      router.push('/');

      showToast(
        'A confirmation email was sent! Please confirm your account!',
        'info'
      );
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  async function handleLogIn(credentials: Auth.LoginRequestPayload) {
    try {
      await AmplifyAuth.signIn(credentials.email, credentials.password);
      router.push('/');
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  function handleLoginWithMicrosoft() {
    AmplifyAuth.federatedSignIn({
      provider: 'Microsoft' as CognitoHostedUIIdentityProvider,
    });
  }

  return {
    error,
    onLogIn: handleLogIn,
    onSignUp: handleSignUp,
    onLoginWithMicrosoft: handleLoginWithMicrosoft,
  };
}

export default useAuth;
