import { useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '../types/auth.types';
import {
  Auth as AmplifyAuth,
  CognitoHostedUIIdentityProvider,
} from '@aws-amplify/auth';
import useToast from '@/hooks/useToast';

function useAuth() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const { onShowToast } = useToast();

  async function handleSignUp(credentials: Auth.RegisterRequestPayload) {
    try {
      await AmplifyAuth.signUp({
        username: credentials.email,
        password: credentials.password,
        autoSignIn: {
          enabled: true,
        },
      });
      router.push('/login');

      onShowToast(
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

  async function handleResetPassword(
    credentials: Pick<Auth.ResetPassword, 'password'>
  ) {
    try {
      const { code, username, email } = router?.query;

      await AmplifyAuth.forgotPasswordSubmit(
        username as string,
        code as string,
        credentials.password
      );

      if (email != null) {
        await AmplifyAuth.signIn({
          username: username as string,
          password: credentials.password,
        });
      }

      onShowToast('Your password was updated!', 'success');
      router.push('/');
    } catch (error) {
      alert('Incorrect code');
    }
  }

  async function handleForgetPassword(credentials: Auth.ForgotPassword) {
    try {
      await AmplifyAuth.forgotPassword(credentials.email);
      router.push('/login');
      onShowToast('An email with reset link was sent!', 'info');
    } catch (error) {
      alert('Incorrect email');
    }
  }

  return {
    error,
    onLogIn: handleLogIn,
    onSignUp: handleSignUp,
    onResetPassword: handleResetPassword,
    onForgetPassword: handleForgetPassword,
    onLoginWithMicrosoft: handleLoginWithMicrosoft,
  };
}

export default useAuth;
