import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
@Injectable()
export class AuthService {
  async createPasswordHash(password: string) {
    const hash = await argon.hash(password);
    return hash;
  }

  async validateAndSignIn(
    username: string,
    password: string,
    userModel: Model<User>,
  ): Promise<boolean> {
    const user = await userModel.findOne({ username });
    console.log('User found', user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordValid = await argon.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }
    console.log('Password matched', password), user.password;

    return true;
  }
}
