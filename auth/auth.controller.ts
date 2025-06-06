import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRequestUser } from './types/jwt-request-user';
import { UserService } from 'user/user.service';
import { User } from 'user/schemas/user.schema';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

interface RequestWithUser extends ExpressRequest {
  user: JwtRequestUser;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) throw new UnauthorizedException();

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: RequestWithUser) {
    const dbUser = await this.userService.findById(req.user.userId);
    if (!dbUser) throw new UnauthorizedException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = dbUser.toObject() as User;
    return safeUser as Omit<User, 'password'>;
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Request() req: RequestWithUser,
    @Body() dto: ChangePasswordDto,
  ) {
    const user = await this.userService.findByIdWithPassword(req.user.userId);
    if (!user || typeof user.password !== 'string') {
      throw new UnauthorizedException('User not found or invalid password');
    }

    const isOldPasswordValid = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      return { message: 'If that email exists, a reset link was sent.' };
    }

    const payload: { sub: string; email: string } = {
      sub: String(user._id),
      email: user.email,
    };

    const token = await this.authService.generateResetToken(payload);
    const frontendUrl: string =
      this.configService.get<string>('NODE_ENV') === 'production'
        ? (this.configService.get<string>('FRONTEND_PROD_URL') ?? '')
        : (this.configService.get<string>('FRONTEND_URL') ?? '');

    const resetUrl = `${frontendUrl}/auth/reset-password?token=${token}`;

    return { message: 'Reset link generated.', resetUrl };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const { token, newPassword } = dto;

    let payload: { sub: string; email: string };
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_RESET_SECRET') ?? 'fallback_reset',
      });
    } catch (err) {
      console.error('JWT reset token verification failed:', err);
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.userService.findByIdWithPassword(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return { message: 'Password has been reset successfully' };
  }
}
