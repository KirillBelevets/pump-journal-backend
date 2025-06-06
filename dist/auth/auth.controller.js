"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const user_service_1 = require("../user/user.service");
const change_password_dto_1 = require("./dto/change-password.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    authService;
    userService;
    jwtService;
    configService;
    constructor(authService, userService, jwtService, configService) {
        this.authService = authService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(dto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        if (!user)
            throw new common_1.UnauthorizedException();
        return this.authService.login(user);
    }
    async register(registerDto) {
        return this.authService.register(registerDto.email, registerDto.password);
    }
    async getMe(req) {
        const dbUser = await this.userService.findById(req.user.userId);
        if (!dbUser)
            throw new common_1.UnauthorizedException();
        const { password: _, ...safeUser } = dbUser.toObject();
        return safeUser;
    }
    async changePassword(req, dto) {
        const user = await this.userService.findByIdWithPassword(req.user.userId);
        if (!user || typeof user.password !== 'string') {
            throw new common_1.UnauthorizedException('User not found or invalid password');
        }
        const isOldPasswordValid = await bcrypt.compare(dto.oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new common_1.UnauthorizedException('Old password is incorrect');
        }
        const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);
        user.password = newHashedPassword;
        await user.save();
        return { message: 'Password changed successfully' };
    }
    async forgotPassword(dto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) {
            return { message: 'If that email exists, a reset link was sent.' };
        }
        const payload = {
            sub: String(user._id),
            email: user.email,
        };
        const token = await this.authService.generateResetToken(payload);
        const resetUrl = `${this.configService.get('FRONTEND_URL')}/auth/reset-password?token=${token}`;
        return { message: 'Reset link generated.', resetUrl };
    }
    async resetPassword(dto) {
        const { token, newPassword } = dto;
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_RESET_SECRET') ?? 'fallback_reset',
            });
        }
        catch (err) {
            console.error('JWT reset token verification failed:', err);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
        const user = await this.userService.findByIdWithPassword(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();
        return { message: 'Password has been reset successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map