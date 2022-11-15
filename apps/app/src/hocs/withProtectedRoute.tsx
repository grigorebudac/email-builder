import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '@aws-amplify/auth';

import { UserSlice } from '@/redux/slices';
import { UserSelectors } from '@/redux/selectors';

type WithProtectedRouteProps = {};

function withProtectedRoute<P>(
  WrappedComponent: React.ComponentType<P & WithProtectedRouteProps>
) {
  const ComponentWithExtraInfo = (props: P) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(UserSelectors.user);

    const [isLoading, setLoading] = useState(user == null);

    const checkAuthenticated = useCallback(async () => {
      if (user != null) {
        setLoading(false);
        return;
      }

      try {
        const user = await Auth.currentAuthenticatedUser();

        dispatch(
          UserSlice.setUser({
            id: user.username,
            email: user.username,
          })
        );
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }, [dispatch, router, user]);

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
