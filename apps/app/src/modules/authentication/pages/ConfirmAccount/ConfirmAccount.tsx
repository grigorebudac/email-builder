import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@aws-amplify/auth';
import LoadingLayout from '@/components/Layouts/LoadingLayout';
import useToast from '@/hooks/useToast';
import { withPublicRoute } from '@/hocs/withPublicRoute';

const ConfirmAccount = () => {
  const { query, isReady, push } = useRouter();
  const { onShowToast } = useToast();

  const handleVerifyAccount = useCallback(async () => {
    const { code, username } = query;

    try {
      if (code == null || username == null) {
        throw new Error('invalid url');
      }

      await Auth.confirmSignUp(username as string, code as string);
    } finally {
      onShowToast('Account successfully confirmed!', 'success');
      push('/login');
    }
  }, [query]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    handleVerifyAccount();
  }, [isReady, handleVerifyAccount]);

  return <LoadingLayout />;
};

export default withPublicRoute(ConfirmAccount);
