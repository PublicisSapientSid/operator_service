import { Controller, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { AuthDTO } from '../dto/Auth.dto';
import { UsersService } from './user.service';
import { User } from '../schemas/user.schema';
import { JwtGuard, UserAuthGuard } from '../auth/guard';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @MessagePattern('findOne')
  async findSingleUserEvent(
    @Body() request: { userID: string },
  ): Promise<User> {
    const { userID } = request;
    return this.usersService.findUserById(userID);
  }

  @UseGuards(JwtGuard)
  @MessagePattern('findAll')
  async findAllUsersEvent(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @MessagePattern('signIn')
  async signInEvent(@Body() user: AuthDTO): Promise<{ access_token: string }> {
    return this.usersService.signIn(user);
  }

  @MessagePattern('register')
  async registerEvent(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.register(user);
  }

  @MessagePattern('coldStart')
  async coldStartEvent(@Body() user: CreateUserDto) {
    return this.usersService.register(user);
  }

  @UseGuards(UserAuthGuard)
  @MessagePattern('update')
  async updateEvent({
    userID,
    requestBody,
  }: {
    userID: string;
    requestBody: UpdateUserDto;
  }): Promise<User> {
    return this.usersService.updateUser(userID, requestBody);
  }

  @UseGuards(UserAuthGuard)
  @MessagePattern('delete')
  async deleteEvent(@Body() request: { userID: string }): Promise<User> {
    const { userID } = request;
    return this.usersService.deleteUser(userID);
  }
}
