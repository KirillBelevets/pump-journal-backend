import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';

type UserSafe = Omit<User, 'password'> & Partial<Pick<User, 'password'>>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      console.log(`❌ No user found for email: ${email}`);
      return null;
    }

    console.log(`🔐 Attempting login for: ${email}`);
    console.log(`➡️ Input password: ${pass}`);
    console.log(`🧂 Stored hash: ${user.password}`);

    const match = await bcrypt.compare(pass, user.password);

    if (match) {
      const plainUser = user.toObject() as UserSafe;
      delete plainUser.password;
      return plainUser;
    }

    return null;
  }

  async login(user: Omit<User, 'password'>): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user._id };
    console.log(`✅ Issuing JWT token for user: ${user.email}`);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create(email, hashedPassword);
    const plainUser = user.toObject() as UserSafe;
    delete plainUser.password;
    return plainUser;
  }

  async generateResetToken(payload: {
    sub: string;
    email: string;
  }): Promise<string> {
    const secret = this.configService.get<string>('JWT_RESET_SECRET');
    if (!secret) {
      console.error('❗ JWT_RESET_SECRET is not defined in environment');
      throw new Error('JWT_RESET_SECRET is not defined in environment');
    }

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return token;
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userService.findByIdWithPassword(userId);
    if (!user) {
      console.error(`❌ User not found for ID: ${userId}`);
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);

    if (!isMatch) {
      console.warn(`❌ Incorrect current password`);
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    user.password = hashed;
    await user.save();

    console.log(`✅ Password changed successfully for user: ${user.email}`);

    return { message: 'Password changed successfully' };
  }
}
