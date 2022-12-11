import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '@aws-amplify/auth';

import { UserSlice } from '@/redux/slices';
import { UserSelectors } from '@/redux/selectors';
import LoadingLayout from '@/components/Layouts/LoadingLayout';

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
        console.log({ user });
        dispatch(
          UserSlice.setUser({
            id: user.username,
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

    if (!isLoading && user != null) {
      return <WrappedComponent {...props} />;
    }

    return <LoadingLayout />;
  };

  return ComponentWithExtraInfo;
}

export { withProtectedRoute };
