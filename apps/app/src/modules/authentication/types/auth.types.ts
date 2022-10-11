export declare namespace Auth {
  export type LoginRequestPayload = {
    email: string,
    password: string
  }

  export type LoginRespose = {
    access_token: string
  };

  export type RegisterRequestPayload = LoginRequestPayload;

  export type RegisterResponse = LoginRespose;
}
