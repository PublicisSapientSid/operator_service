import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';

class RoomType {
  @IsString()
  roomType: string;
  @IsNumber()
  pricing: number;
  @IsArray()
  @IsOptional()
  availability: Availability[];
}

class Availability {
  date: string;
  available_rooms: number;
}

export class CreateHotelDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  shortname: string;

  @IsOptional()
  latitude: number;

  @IsOptional()
  longitude: number;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  country: string;

  @IsOptional()
  rating: number;

  @IsOptional()
  amenities: string[];

  @IsNumber()
  totalRooms: number;

  @IsOptional()
  @IsBoolean()
  hasRestaurant: boolean;

  @IsOptional()
  @IsBoolean()
  hasSpa: boolean;

  @IsOptional()
  @IsBoolean()
  hasParking: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @ArrayNotEmpty()
  types: RoomType[];

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  images: string[];
}
