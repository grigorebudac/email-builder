export function isJWTValid(jwtToken: string) {
  if (jwtToken == null) return false;
  const jwtPayload = JSON.parse(window.atob(jwtToken.split('.')[1]));

  return jwtPayload.exp * 1000 > Date.now();
}