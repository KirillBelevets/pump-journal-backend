import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
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
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(authService: AuthService, userService: UserService, jwtService: JwtService, configService: ConfigService);
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<Omit<User, "password">>;
    getMe(req: RequestWithUser): Promise<Omit<User, "password">>;
    changePassword(req: RequestWithUser, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
        resetUrl?: undefined;
    } | {
        message: string;
        resetUrl: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
export {};
