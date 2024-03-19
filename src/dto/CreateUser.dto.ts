import { IsEmail, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  isAdmin: boolean;

  @IsIn(['hotels', 'airlines'])
  service: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsIn(['admin', 'manager', 'staff'])
  @IsNotEmpty()
  role: string;
}
