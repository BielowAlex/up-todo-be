import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { JwtNames, JwtPayload, JwtTokens } from './auth.types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly userService: UserService,
    protected readonly configService: ConfigService,
  ) {}

  public async googleLogin(req: Request, res: Response) {
    if (!req.user) {
      throw new ConflictException('Something went wrong');
    }

    const user: any = req.user;

    const currentUser: User =
      await this.userService.getByEmailWithoutValidation(user.email);

    if (currentUser) {
      const payload: JwtPayload = { id: currentUser._id };
      const tokens: JwtTokens = this.generateTokens(payload);

      this.saveTokens(tokens, res);

      return currentUser;
    }

    const newUser: User = await this.userService.create({
      ...user,
      password: null,
    });

    const payload: JwtPayload = { id: newUser._id };
    const tokens: JwtTokens = this.generateTokens(payload);

    this.saveTokens(tokens, res);

    return newUser;
  }

  public async signIn(createAuthDto: SignInDto, response: Response) {
    const currentUser: User = await this.userService.getByEmail(
      createAuthDto.email,
    );

    const isPasswordValid: boolean = await compare(
      createAuthDto.password,
      currentUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect credentials ');
    }

    const payload: JwtPayload = { id: currentUser._id };
    const tokens: JwtTokens = this.generateTokens(payload);

    this.saveTokens(tokens, response);

    return currentUser;
  }

  public async signUp(userInfo: CreateUserDto, response: Response) {
    const newUser: User = await this.userService.create(userInfo);

    const payload: JwtPayload = { id: newUser._id };
    const tokens: JwtTokens = this.generateTokens(payload);

    this.saveTokens(tokens, response);

    return newUser;
  }

  public signOut(response: Response) {
    this.clearTokens(response);

    return {
      message: 'Successfully signed out',
    };
  }

  public async refreshTokens(response: Response, request: Request) {
    const refresh: string = request.cookies[JwtNames.REFRESH_TOKEN];

    if (!refresh) {
      throw new BadRequestException('Refresh token expired');
    }

    const extract = await this.jwtService.verify(refresh, {
      secret: this.configService.getOrThrow<string>('JWT_PRIVATE_KEY'),
    });

    const currentUser: User = await this.userService.getById(extract.id);

    const payload: JwtPayload = { id: currentUser._id };
    const tokens: JwtTokens = this.generateTokens(payload);

    this.clearTokens(response);
    this.saveTokens(tokens, response);

    return {
      message: 'Tokens refreshed',
    };
  }

  private clearTokens(response: Response) {
    response.cookie(JwtNames.ACCESS_TOKEN, '', {
      expires: new Date(Date.now()),
    });
    response.cookie(JwtNames.REFRESH_TOKEN, '', {
      expires: new Date(Date.now()),
    });
  }

  private saveTokens(tokens: JwtTokens, response: Response) {
    response.cookie(JwtNames.ACCESS_TOKEN, tokens.access_token, {
      httpOnly: true,
      secure: true,
    });
    response.cookie(JwtNames.REFRESH_TOKEN, tokens.refresh_token, {
      httpOnly: true,
      secure: true,
    });
  }

  private generateTokens(payload: JwtPayload): JwtTokens {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '30d',
      }),
    };
  }
}
