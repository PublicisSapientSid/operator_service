import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Availability {
  date: string;
  available_rooms: number;
}

@Schema()
class RoomType {
  @Prop()
  roomType: string;
  @Prop()
  pricing: number;
  @Prop()
  availability: Availability[];
}

@Schema({
  timestamps: true,
})
export class Hotel {
  @Prop()
  name: string;

  @Prop()
  shortname: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  country: string;

  @Prop()
  rating: number;

  @Prop()
  amenities: string[];

  @Prop()
  totalRooms: number;

  @Prop()
  hasRestaurant: boolean;

  @Prop()
  hasSpa: boolean;

  @Prop()
  hasParking: boolean;

  @Prop()
  description: string;

  @Prop()
  types: RoomType[];

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  images: string[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
