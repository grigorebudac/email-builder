import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE } from '@/config/constants';

type WithProtectedRouteProps = unknown;

function isJWTValid(jwtToken: string) {
  if (jwtToken == null) return false;
  const jwtPayload = JSON.parse(window.atob(jwtToken.split('.')[1]));

  return jwtPayload.exp * 1000 < Date.now();
}

function withProtectedRoute<P>(
  WrappedComponent: React.ComponentType<P & WithProtectedRouteProps>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const router = useRouter();
    const jwtToken = localStorage.getItem(LOCAL_STORAGE.TOKEN);

    const [isLoading, setLoading] = useState(jwtToken == null);

    const checkAuthenticated = useCallback(async () => {
      const isTokenValid = isJWTValid(jwtToken);

      if (isTokenValid) {
        setLoading(false);
        return;
      }

      router.push('/login');
      setLoading(false);
    }, [jwtToken, router]);

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
