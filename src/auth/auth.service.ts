import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signin() {
    return 'Signin route';
  }

  signup() {
    return 'SignUp route';
  }
}
