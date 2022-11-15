import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Auth } from '@aws-amplify/auth';

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

    if (isLoading) {
      return <h1>Loading</h1>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithExtraInfo;
}

export { withPublicRoute };
