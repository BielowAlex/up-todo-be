import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) protected readonly userModel: Model<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const isEmailInUse = await this.userModel
      .exists({
        email: createUserDto.email,
      })
      .exec();

    if (isEmailInUse) {
      throw new ConflictException('User already  exist');
    }

    return await new this.userModel({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
      avatar: createUserDto.avatar ? createUserDto.avatar : null,
    }).save();
  }

  public async getById(id: string): Promise<User> {
    const currentUser: User = await this.userModel.findById(id).exec();

    if (!currentUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return currentUser;
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateInfo: UpdateUserDto = {
      ...updateUserDto,
      password: updateUserDto.password
        ? await hash(updateUserDto.password, 10)
        : null,
    };

    const updatedUser: User = await this.userModel
      .findByIdAndUpdate(id, updateInfo, {
        new: true,
      })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  public async remove(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return {
      result,
      message: 'Account Delete Successfully',
    };
  }

  public async getByEmail(email: string): Promise<User> {
    const currentUser: User = await this.userModel.findOne({ email }).exec();

    if (!currentUser) {
      throw new NotFoundException(`User not found`);
    }

    return currentUser;
  }

  public async getByEmailWithoutValidation(email: string): Promise<User> {
    const currentUser: User = await this.userModel.findOne({ email }).exec();

    if (!currentUser) {
      return null;
    }

    return currentUser;
  }

  public async updatePassword(
    { currentPassword, newPassword }: UpdatePasswordDto,
    userId: string,
  ): Promise<User> {
    const currentUser: User = await this.getById(userId);

    const isPasswordValid: boolean = await compare(
      currentPassword,
      currentUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect Credentials');
    }

    const updatedPassword = {
      password: await hash(newPassword, 10),
    };

    return await this.userModel
      .findByIdAndUpdate(userId, updatedPassword, {
        new: true,
      })
      .exec();
  }
}
