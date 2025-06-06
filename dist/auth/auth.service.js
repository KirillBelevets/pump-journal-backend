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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    userService;
    jwtService;
    configService;
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, pass) {
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
            const plainUser = user.toObject();
            delete plainUser.password;
            return plainUser;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user._id };
        console.log(`✅ Issuing JWT token for user: ${user.email}`);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async register(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.create(email, hashedPassword);
        const plainUser = user.toObject();
        delete plainUser.password;
        return plainUser;
    }
    async generateResetToken(payload) {
        const secret = this.configService.get('JWT_RESET_SECRET');
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
    async changePassword(userId, dto) {
        const user = await this.userService.findByIdWithPassword(userId);
        if (!user) {
            console.error(`❌ User not found for ID: ${userId}`);
            throw new common_1.UnauthorizedException('User not found');
        }
        const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isMatch) {
            console.warn(`❌ Incorrect current password`);
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        user.password = hashed;
        await user.save();
        console.log(`✅ Password changed successfully for user: ${user.email}`);
        return { message: 'Password changed successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map