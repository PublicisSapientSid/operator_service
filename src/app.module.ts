import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

console.log({ MONGO_URI: process.env.MONGO_URI });

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
})
export class AppModule {}
