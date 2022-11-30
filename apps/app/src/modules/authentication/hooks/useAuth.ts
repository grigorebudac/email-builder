import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '../types/auth.types';
import {
  Auth as AmplifyAuth,
  CognitoHostedUIIdentityProvider,
} from '@aws-amplify/auth';

function useAuth() {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  async function onSignIn(credentials: Auth.RegisterRequestPayload) {
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
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  async function onLogIn(credentials: Auth.LoginRequestPayload) {
    try {
      await AmplifyAuth.signIn(credentials.email, credentials.password);
      router.push('/');
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  function onLoginWithMicrosoft() {
    AmplifyAuth.federatedSignIn({
      provider: 'Microsoft' as CognitoHostedUIIdentityProvider,
    });
  }

  return { error, onLogIn, onSignIn, onLoginWithMicrosoft };
}

export default useAuth;
