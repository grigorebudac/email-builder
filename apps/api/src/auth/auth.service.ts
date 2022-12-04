import { Injectable } from '@nestjs/common';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  userPool: CognitoUserPool;

  constructor(private config: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: config.get('COGNITO_USER_POOL_ID'),
      ClientId: config.get('COGNITO_CLIENT_ID'),
    });
  }
}
