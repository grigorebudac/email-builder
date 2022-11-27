import { withPublicRoute } from '@/hocs/withPublicRoute';
import React, { useCallback, useEffect } from 'react';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';
import { Auth } from '../../types/auth.types';
import { Auth as AmplifyAuth } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';

const ResetPassword = () => {
  const { query, isReady, push } = useRouter();

  const handleVerifyAccount = useCallback(async () => {
    const { code, username } = query;

    if (code == null || username == null) {
      push('/');
    }
  }, [query]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    handleVerifyAccount();
  }, [isReady, handleVerifyAccount]);

  async function handleSubmit(
    credentials: Pick<Auth.ResetPassword, 'password'>
  ) {
    try {
      const { code, username, email } = query;

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

      push('/');
    } catch (error) {
      alert('Incorrect code');
    }
  }

  return (
    <AuthenticationLayout>
      <ResetPasswordForm onSubmit={handleSubmit} />
    </AuthenticationLayout>
  );
};

export default withPublicRoute(ResetPassword);
