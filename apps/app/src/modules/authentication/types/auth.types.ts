export declare namespace Auth {
  export type LoginRequestPayload = {
    email: string;
    password: string;
  };

  export type LoginRespose = {
    access_token: string;
  };

  export type RegisterRequestPayload = LoginRequestPayload;

  export type RegisterResponse = LoginRespose;

  export type ForgotPassword = {
    email: string;
  };

  export type ResetPassword = {
    email: string;
    code: string;
    password: string;
  };
}

export enum InitialAuthSection {
  Login = 0,
  Register = 1,
}
