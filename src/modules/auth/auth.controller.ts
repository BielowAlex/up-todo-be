import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/schemas/user.schema';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  public async googleAuth(@Req() req: Request) {
    console.log(req);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  public async googleAuthCallback(@Req() req: Request) {
    return this.authService.googleLogin(req);
  }
  @Post('sign-in')
  @ApiOperation({ summary: 'sign-in' })
  @ApiBody({ type: SignInDto })
  public async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() body: SignInDto,
  ) {
    return await this.authService.signIn(body, res);
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'sign-up' })
  @ApiBody({ type: CreateUserDto })
  public async signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() createAuthDto: CreateUserDto,
  ): Promise<User> {
    return await this.authService.signUp(createAuthDto, res);
  }

  @Post('sign-out')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'sign-out' })
  public signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'refresh' })
  public async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshTokens(res, req);
  }
}
