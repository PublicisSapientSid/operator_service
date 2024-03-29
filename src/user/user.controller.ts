import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { AuthDTO } from '../dto/Auth.dto';
import { UsersService } from './user.service';
import { User } from '../schemas/user.schema';
import { JwtGuard, UserAuthGuard } from '../auth/guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @UseGuards(UserAuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.register(user);
  }

  @Post('signin')
  async signIn(@Body() user: AuthDTO): Promise<{ access_token: string }> {
    return this.usersService.signIn(user);
  }
}
