import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE } from '@/config/constants';
import { isJWTValid } from '@/modules/authentication/utils/auth.utils';

type WithProtectedRouteProps = unknown;

function withProtectedRoute<P>(
  WrappedComponent: React.ComponentType<P & WithProtectedRouteProps>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    const checkAuthenticated = useCallback(async () => {
      const jwtToken = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const isTokenValid = isJWTValid(jwtToken);

      if (isTokenValid) {
        setLoading(false);
        return;
      }

      router.push('/login');
      setLoading(false);
    }, [router]);

    useEffect(() => {
      checkAuthenticated();
    }, [checkAuthenticated]);

    if (isLoading) {
      return <h1>Loading auth</h1>;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithExtraInfo;
}

export { withProtectedRoute };
