import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class UserAuthStrategy extends PassportStrategy(Strategy, 'user-auth') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          const token = request?.authorization;
          return token.split('Bearer ')[1];
        },
      ]),
      secretOrKey: config.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { userID: string },
    payload: { sub: string; email: string },
  ) {
    if (payload.sub === req.userID) return payload;
  }
}
