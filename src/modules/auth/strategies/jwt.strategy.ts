import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth.types';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_PRIVATE_KEY'),
    });
  }
  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'UP_access_token' in req.cookies) {
      return req.cookies.UP_access_token;
    }
    return null;
  }

  async validate(payload: JwtPayload) {
    // validating payload here

    if (payload.id) {
      return { id: payload.id };
    }

    // return 401 Unauthorized error
    return null;
  }
}
