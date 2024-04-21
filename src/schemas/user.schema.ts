import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  ADMIN_ROLE,
  AIRLINE_SERVICE,
  HOTEL_SERVICE,
  MANAGER_ROLE,
  STAFF_ROLE,
} from '../utils/constants';
import { Hotel } from './hotel.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Username already exists'] })
  username: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ enum: [HOTEL_SERVICE, AIRLINE_SERVICE], default: 'hotel' })
  service: string;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: [ADMIN_ROLE, MANAGER_ROLE, STAFF_ROLE], default: 'staff' })
  role: string;

  @Prop({ type: [Hotel], ref: 'Hotel' })
  hotels: Hotel[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Airline' })
  airlines: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
