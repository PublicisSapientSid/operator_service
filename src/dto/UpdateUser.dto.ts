import { IsEmail, IsOptional, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  isAdmin?: boolean;

  @IsIn(['hotels', 'airlines'])
  @IsOptional()
  service?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsIn(['admin', 'manager', 'staff'])
  @IsOptional()
  role?: string;
}
