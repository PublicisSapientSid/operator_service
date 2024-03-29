import { IsEmail, IsOptional, IsIn } from 'class-validator';
import {
  HOTEL_SERVICE,
  AIRLINE_SERVICE,
  ADMIN_ROLE,
  MANAGER_ROLE,
  STAFF_ROLE,
} from '../utils/constants';

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  isAdmin?: boolean;

  @IsIn([HOTEL_SERVICE, AIRLINE_SERVICE])
  @IsOptional()
  service?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsIn([ADMIN_ROLE, MANAGER_ROLE, STAFF_ROLE])
  @IsOptional()
  role?: string;
}
