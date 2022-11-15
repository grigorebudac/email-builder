import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthService } from '../auth.service';
import { Cognito } from '../types/cognito.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService
  ) {
    const authority = `https://cognito-idp.${config.get(
      'COGNITO_REGION'
    )}.amazonaws.com/${config.get('COGNITO_USER_POOL_ID')}`;

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.get('COGNITO_CLIENT_ID'),
      issuer: authority,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: Cognito.JwtPayload) {
    if (payload.sub == null) {
      throw new UnauthorizedException();
    }

    return payload.sub;
  }
}
