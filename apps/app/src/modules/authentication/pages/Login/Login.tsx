import React, { useState } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../redux/endpoints/authentication.endpoints';
import { useRouter } from 'next/router';
import { useLazyGetCurrentUserQuery } from '@/redux/endpoints/user.endpoints';
import { useDispatch } from 'react-redux';
import { UserSlice } from '@/redux/slices';
import { LOCAL_STORAGE } from '@/config/constants';
import { Auth } from '../../types/auth.types';
import { AuthenticationLayout } from '../../components/Layouts/AuthenticationLayout';
import { LoginForm } from '../../components/Forms/LoginForm';
import { RegisterForm } from '../../components/Forms/RegisterForm';

const Login = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [logInCall] = useLoginMutation();
  const [registerCall] = useRegisterMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();
  const router = useRouter();

  const testCredentials = { email: 'test@gmail.com', password: 'pass1' };

  async function handleSignIn(credentials: Auth.LoginRequestPayload) {
    try {
      const tokenResponse = await logInCall(testCredentials).unwrap();

      if (tokenResponse.access_token == null) return;

      localStorage.setItem(LOCAL_STORAGE.TOKEN, tokenResponse.access_token);
      const currentUser = await getCurrentUser().unwrap();
      dispatch(UserSlice.setUser(currentUser));
      router.push('/');
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  async function handleRegister(credentials: Auth.RegisterRequestPayload) {
    try {
      const tokenResponse = await registerCall(testCredentials).unwrap();

      if (tokenResponse.access_token == null) return;

      localStorage.setItem(LOCAL_STORAGE.TOKEN, tokenResponse.access_token);
      const currentUser = await getCurrentUser().unwrap();
      dispatch(UserSlice.setUser(currentUser));
      router.push('/');
    } catch (error) {
      error instanceof Error ? setError(error.message) : setError('');
    }
  }

  return (
    <AuthenticationLayout
      loginSection={<LoginForm onSubmit={handleSignIn} />}
      registerSection={<RegisterForm onSubmit={handleRegister} />}
    />
  );
};

export default Login;
