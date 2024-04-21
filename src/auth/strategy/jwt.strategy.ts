import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
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
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userModel.findById(payload.sub);
    if (user.isAdmin) return payload;
  }
}
