import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  async createPasswordHash(password: string) {
    const hash = await argon.hash(password);
    return hash;
  }
}
