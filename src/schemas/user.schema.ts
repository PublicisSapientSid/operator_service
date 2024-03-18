import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Email already exists'] })
  username: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ enum: ['hotels', 'airlines'], default: 'hotel' })
  service: string;

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

export const UserSchema = SchemaFactory.createForClass(User);
