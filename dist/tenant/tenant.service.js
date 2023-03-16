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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tenant_schema_1 = require("./schema/tenant.schema");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const date_fns_1 = require("date-fns");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
let TenantService = class TenantService {
    constructor(tenantModel, jwtService, logger) {
        this.tenantModel = tenantModel;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    async findByEmail(email) {
        return await this.tenantModel.findOne({ email });
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
    async comparePassword(enteredPassword, dbPassword) {
        return await bcrypt.compare(enteredPassword, dbPassword);
    }
    async validateUser(email, pass) {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException(['User not found']);
        }
        const matchPass = await this.comparePassword(pass, user.password);
        if (!matchPass) {
            throw new common_1.BadRequestException(['Password incorrect']);
        }
        const { password } = user, result = __rest(user, ["password"]);
        return result;
    }
    async verifyVerificationToken(token, email) {
        const user = await this.tenantModel.findOne({ email });
        const now = new Date();
        if (!user) {
            throw new common_1.BadRequestException('Invalid email');
        }
        if (!(token == user.verification.token)) {
            throw new common_1.BadRequestException('Invalid Token');
        }
        if (!(0, date_fns_1.isBefore)(now, user.verification.expiry)) {
            this.logger.warn(`Token ${token} is expired for Tenant with email ${email}`);
            throw new common_1.BadRequestException('Token is expired');
        }
        user['verification'] = {
            token: '',
            expiry: null,
            isVerified: true,
        };
        this.logger.info(`Tenant with email ${email} verified successfully`);
        user.save();
        return 'Tenant verified!';
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
            passwordUpdatedAt: null,
        };
        await user.save();
        return { token: token };
    }
    async create(createTenantDto) {
        const pass = await this.hashPassword(createTenantDto.password);
        createTenantDto.password = pass;
        const user = await this.tenantModel.create(createTenantDto);
        const token = await this.generateToken({ email: user.email, id: user.id });
        const expirestAt = (0, date_fns_1.addMinutes)(new Date(), 60);
        user['verification'] = {
            token: token,
            expiry: expirestAt,
            isVerified: false,
        };
        await user.save();
        this.logger.info('Tenant created successfully!');
        return { message: "Tenant created successfully!", token: user.verification.token };
    }
    async loginUser(email, password) {
        const validate = await this.validateUser(email, password);
        if (!validate) {
            this.logger.warn(`Email:${email} or password is incorrect`);
            return new common_1.UnauthorizedException('Invalid Credentials');
        }
        validate.isLoggedIn = true;
        const token = await this.generateToken({ email, id: validate.id });
        this.logger.info('Tenant successfully logged in!');
        return { message: 'Tenant Logged in successfully!', token: token };
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
            throw new common_1.BadRequestException('No tenant found with this email');
        }
        const tokenVerify = user.passwordUpdate.token == token;
        if (!tokenVerify) {
            throw new common_1.BadRequestException(['Invalid token']);
        }
        const now = new Date();
        if (!(0, date_fns_1.isBefore)(now, user.passwordUpdate.expiry)) {
            throw new common_1.BadRequestException(['Token expired']);
        }
        const pass = await this.hashPassword(password);
        user.password = pass;
        user.passwordUpdate.token = '';
        user.passwordUpdate.expiry = null;
        user.passwordUpdate.passwordUpdatedAt = new Date();
        await user.save();
        this.logger.info('Password changed successfully');
        return 'Password successfully changed';
    }
    async findById(id) {
        return await this.tenantModel.findById(id);
    }
    async edit(id, updateTenantDto) {
        const tenant = await this.findById(id);
        if (!tenant) {
            throw new common_1.BadRequestException('Tenant with this id not found');
        }
        await this.tenantModel.findByIdAndUpdate(id, updateTenantDto);
        this.logger.info('Tenant updated successfully!');
        return 'Tenant updated successfully!';
    }
};
TenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tenant_schema_1.Tenant.name)),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService,
        winston_1.Logger])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenant.service.js.map