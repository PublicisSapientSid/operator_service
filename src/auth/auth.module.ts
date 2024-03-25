import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy, UserAuthStrategy } from './strategy';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, JWTStrategy, UserAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
