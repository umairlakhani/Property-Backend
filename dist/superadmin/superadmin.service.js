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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperadminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nest_winston_1 = require("nest-winston");
const user_service_1 = require("../user/user.service");
const winston_1 = require("winston");
const super_admin_schema_1 = require("./schema/super-admin.schema");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const date_fns_1 = require("date-fns");
let SuperadminService = class SuperadminService {
    constructor(superAdminModel, jwtService, logger, userService) {
        this.superAdminModel = superAdminModel;
        this.jwtService = jwtService;
        this.logger = logger;
        this.userService = userService;
    }
    async createSuperAdmin(createSuperAdmin) {
        const pass = await this.userService.hashPassword(createSuperAdmin.password);
        createSuperAdmin.password = pass;
        const superAdmin = await this.superAdminModel.create(createSuperAdmin);
        this.logger.info('Super admin created successfully!');
        return { message: 'Super admin created successfully!' };
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }
    async findByEmail(email) {
        const user = await this.superAdminModel.findOne({ email });
        console.log(user);
        return user;
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
    async superAdminLogin(creds) {
        const exists = await this.findByEmail(creds.email);
        if (!exists) {
            throw new common_1.BadRequestException('No super admin with this email');
        }
        const matchPass = await this.comparePassword(creds.password, exists.password);
        if (!matchPass) {
            throw new common_1.BadRequestException('Password Incorrect');
        }
        const token = await this.userService.generateToken({
            email: creds.email,
            id: exists.id,
        });
        exists.token = token;
        await exists.save();
        this.logger.info('Superadmin loggedin successfully!');
        return { message: "Logged in successfully",
            token: token };
    }
    async forgotPass(forgotPassDto) {
        const user = await this.findByEmail(forgotPassDto.email);
        if (!user) {
            this.logger.warn(`Email:${forgotPassDto.email} is incorrect`);
            throw new common_1.BadRequestException('Invalid email address');
        }
        const token = await this.generateToken({ email: user.email, id: user.id });
        const expirestAt = (0, date_fns_1.addMinutes)(new Date(), 60);
        user.passwordUpdate = {
            token: token,
            expiry: expirestAt,
            passwordUpdatedAt: null
        };
        await user.save();
        return { token: token };
    }
    async changePassword(email, token, password, confirmPassword) {
        if (password.length < 8) {
            throw new common_1.BadRequestException([
                'Password length must be of 8 characters',
            ]);
        }
        if (!(password == confirmPassword)) {
            throw new common_1.BadRequestException([
                'Password and confirm password must be same',
            ]);
        }
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException('No superadmin found with this email');
        }
        const pass = await this.hashPassword(password);
        const tokenVerify = user.passwordUpdate.token == token;
        const now = new Date();
        if (!tokenVerify) {
            throw new common_1.BadRequestException(['Invalid token']);
        }
        if (!(0, date_fns_1.isBefore)(now, user.passwordUpdate.expiry)) {
            throw new common_1.BadRequestException(['Token expired']);
        }
        user.password = pass;
        user.passwordUpdate.token = '';
        user.passwordUpdate.expiry = null;
        user.passwordUpdate.passwordUpdatedAt = new Date();
        await user.save();
        this.logger.info('Password changed successfully');
        return { message: 'Password successfully changed' };
    }
};
SuperadminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(super_admin_schema_1.SuperAdmin.name)),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService,
        winston_1.Logger,
        user_service_1.UserService])
], SuperadminService);
exports.SuperadminService = SuperadminService;
//# sourceMappingURL=superadmin.service.js.map