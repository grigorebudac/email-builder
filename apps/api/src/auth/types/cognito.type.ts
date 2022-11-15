export declare namespace Cognito {
  export interface JwtPayload {
    at_hash: string;
    sub: string;
    'cognito:groups': string[];
    email_verified: boolean;
    iss: string;
    'cognito:username': string;
    nonce: string;
    aud: string;
    identities: JwtIdentity[];
    token_use: string;
    auth_time: number;
    exp: number;
    iat: number;
    jti: string;
    email: string;
  }

  export interface JwtIdentity {
    userId: string;
    providerName: string;
    providerType: string;
    issuer: any;
    primary: string;
    dateCreated: string;
  }
}
