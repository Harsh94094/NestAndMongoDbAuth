"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const users_entity_1 = require("../users/users.entity");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    configService;
    usersService;
    jwtService;
    constructor(configService, usersService, jwtService) {
        this.configService = configService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass, email) {
        const user = await this.usersService.findOneByUsernameOrEmail(username, email);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
    async login(user) {
        const payload = { username: user.username, sub: user._id, roles: user.roles, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(email, username, password, roles = [users_entity_1.Role.USER]) {
        const user = await this.usersService.create(username, password, roles, email);
        const payload = { username: user.username, sub: user._id, roles: user.roles, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map