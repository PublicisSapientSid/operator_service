import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'manager', 'staff'], default: 'staff' })
  role: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Hotel' })
  hotels: string[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Airline' })
  airlines: string[];
}

// Define createUser DTO class
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  isAdmin: boolean;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'manager', 'staff'])
  role: string;

  @IsArray()
  @IsOptional()
  hotels: string[];

  @IsArray()
  @IsOptional()
  airlines: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
