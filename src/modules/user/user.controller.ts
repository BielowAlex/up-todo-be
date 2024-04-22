import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { ExtractUserId } from '../../shared/decorators/extract-user-id.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create a new user' })
  @ApiBody({ type: CreateUserDto })
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Patch('password')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'create a new user' })
  @ApiBody({ type: CreateUserDto })
  public async updatePassword(
    @Body() passwordInfo: UpdatePasswordDto,
    @ExtractUserId() userId: string,
  ): Promise<User> {
    return await this.userService.updatePassword(passwordInfo, userId);
  }

  @Get('one/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get by id' })
  @ApiParam({ name: 'id' })
  public async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user info by token' })
  public async getUserInfo(@ExtractUserId() id: string) {
    return await this.userService.getById(id);
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update me ' })
  public async update(
    @ExtractUserId() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('me')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete me' })
  public async remove(@ExtractUserId() id: string) {
    return await this.userService.remove(id);
  }
}
