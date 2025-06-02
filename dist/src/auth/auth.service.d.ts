import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null>;
    login(user: Omit<User, 'password'>): Promise<{
        access_token: string;
    }>;
    register(email: string, password: string): Promise<Omit<User, 'password'>>;
}
