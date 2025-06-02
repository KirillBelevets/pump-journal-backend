import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
export interface JwtPayload {
    sub: string;
    email: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        email: string;
    }>;
}
export {};
