import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async createPasswordHash(password: string): Promise<string> {
    const hash = await argon.hash(password);
    return hash;
  }

  async validateAndSignIn(
    username: string,
    password: string,
    userModel: Model<User>,
  ): Promise<{ access_token: string }> {
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await argon.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userID: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userID,
      email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      secret: process.env.JWT_SECRET,
    });
    return {
      access_token: token,
    };
  }
}
