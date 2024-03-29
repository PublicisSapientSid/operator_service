import { IsEmail, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import {
  ADMIN_ROLE,
  AIRLINE_SERVICE,
  HOTEL_SERVICE,
  MANAGER_ROLE,
  STAFF_ROLE,
} from '../utils/constants';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  isAdmin: boolean;

  @IsIn([HOTEL_SERVICE, AIRLINE_SERVICE])
  service: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsIn([ADMIN_ROLE, MANAGER_ROLE, STAFF_ROLE])
  @IsNotEmpty()
  role: string;
}
