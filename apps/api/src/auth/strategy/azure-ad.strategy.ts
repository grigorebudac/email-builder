import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';
/**
 * Extracts ID token from header and validates it.
 */
const tenantID = '9ea4115e-13c5-49fd-81e8-405f79819015';
const clientID = '6437757a-7db5-4ba5-9405-bfcb093090d0';

@Injectable()
export class AzureADStrategy extends PassportStrategy(
  BearerStrategy,
  'azure-ad'
) {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }

  async validate(data) {
    return data;
  }
}
