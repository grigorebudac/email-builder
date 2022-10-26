import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE } from '@/config/constants';
import { isJWTValid } from '@/modules/authentication/utils/auth.utils';

type WithPublicRouteProps = unknown;

function withPublicRoute<P>(
  WrappedComponent: React.ComponentType<P & WithPublicRouteProps>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    const checkAuthenticated = useCallback(async () => {
      try {
        const jwtToken = localStorage.getItem(LOCAL_STORAGE.TOKEN);
        const isTokenValid = isJWTValid(jwtToken);

        if (isTokenValid) router.push('/');
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
