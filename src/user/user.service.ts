import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { UpdateUserDto } from '../dto/UpdateUser.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [{ username: user.username }, { email: user.email }],
    });
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }
    user.isAdmin = user.role === 'admin';
    user.password = await this.authService.createPasswordHash(user.password);
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('User not found', 404);
    }
    const foundUser = await this.userModel.findById(id);
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    return foundUser;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('User not found', 404);
    }
    const foundUser = await this.userModel.findById(id);
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    user.isAdmin = user.role === 'admin';
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string): Promise<User> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('User not found', 404);
    }
    const foundUser = await this.userModel.findById(id);
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    return this.userModel.findByIdAndDelete(id);
  }
}
