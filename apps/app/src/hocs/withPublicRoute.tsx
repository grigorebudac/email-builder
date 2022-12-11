import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@aws-amplify/auth';
import LoadingLayout from '@/components/Layouts/LoadingLayout';

type WithPublicRouteProps = {};

function withPublicRoute<P>(
  WrappedComponent: React.ComponentType<P & WithPublicRouteProps>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    const checkAuthenticated = useCallback(async () => {
      try {
        await Auth.currentAuthenticatedUser();
        router.push('/');
      } finally {
        setLoading(false);
      }
    }, [router]);

    useEffect(() => {
      checkAuthenticated();
    }, [checkAuthenticated]);

    if (!isLoading) {
      return <WrappedComponent {...props} />;
    }

    return <LoadingLayout />;
  };

  return ComponentWithExtraInfo;
}

export { withPublicRoute };
