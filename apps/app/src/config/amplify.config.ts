const amplifyConfig = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
    identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID,
    oauth: {
      domain: process.env.NEXT_PUBLIC_OAUTH_DOMAIN,
      redirectSignIn: process.env.NEXT_PUBLIC_OAUTH_REDIRECT,
      redirectSignOut: process.env.NEXT_PUBLIC_OAUTH_REDIRECT,
      responseType: 'token',
    },
  },
};

export { amplifyConfig };
