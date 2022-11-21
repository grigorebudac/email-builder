import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@aws-amplify/auth';
import LoadingLayout from '@/components/Layouts/LoadingLayout';

const ConfirmAccount = () => {
  const { query, isReady, push } = useRouter();

  const handleVerifyAccount = useCallback(async () => {
    const { code, username } = query;

    try {
      if (code == null || username == null) {
        throw new Error('invalid url');
      }

      await Auth.confirmSignUp(username as string, code as string);
    } finally {
      push('/');
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

export default ConfirmAccount;
