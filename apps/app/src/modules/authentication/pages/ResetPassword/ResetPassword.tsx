import { withPublicRoute } from '@/hocs/withPublicRoute';
import React, { useCallback, useEffect } from 'react';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';
import { useRouter } from 'next/router';
import AuthenticationLayout from '../../components/Layouts/AuthenticationLayout/AuthenticationLayout';
import Head from 'next/head';
import useAuth from '../../hooks/useAuth';

const ResetPassword = () => {
  const { onResetPassword } = useAuth();
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

  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <AuthenticationLayout
        title="Reset password"
        subtitle="Insert your new password"
      >
        <ResetPasswordForm onSubmit={onResetPassword} />
      </AuthenticationLayout>
    </>
  );
};

export default withPublicRoute(ResetPassword);
