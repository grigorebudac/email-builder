import React, { useEffect, useState } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../redux/endpoints/authentication.endpoints';
import { useRouter } from 'next/router';
import { LOCAL_STORAGE } from '@/config/constants';
import { Auth } from '../../types/auth.types';
import { AuthenticationLayout } from '../../components/Layouts/AuthenticationLayout';
import { LoginForm } from '../../components/Forms/LoginForm';
import { RegisterForm } from '../../components/Forms/RegisterForm';

type AuthenticationSectionProps = {
  initial: Auth.InitialAuthSection;
};

const AuthenticationSection: React.FC<AuthenticationSectionProps> = ({
  initial,
}) => {
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [logInCall] = useLoginMutation();
  const [registerCall] = useRegisterMutation();
  const router = useRouter();

  async function handleAuthResponse(tokenResponse: Auth.LoginRespose) {
    if (tokenResponse.access_token == null) return;

    localStorage.setItem(LOCAL_STORAGE.TOKEN, tokenResponse.access_token);
    setRegisterError('');
    setLoginError('');
    router.push('/');
  }

  async function handleSignIn(credentials: Auth.LoginRequestPayload) {
    try {
      const tokenResponse = await logInCall(credentials).unwrap();
      handleAuthResponse(tokenResponse);
    } catch (error) {
      setLoginError(error?.data?.message);
    }
  }

  async function handleRegister(credentials: Auth.RegisterRequestPayload) {
    try {
      const tokenResponse = await registerCall(credentials).unwrap();
      handleAuthResponse(tokenResponse);
    } catch (error) {
      setRegisterError(error?.data?.message);
    }
  }

  return (
    <AuthenticationLayout
      loginSection={<LoginForm onSubmit={handleSignIn} error={loginError} />}
      registerSection={
        <RegisterForm onSubmit={handleRegister} error={registerError} />
      }
      initial={initial}
    />
  );
};

export { AuthenticationSection };
