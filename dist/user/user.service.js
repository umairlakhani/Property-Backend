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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const nest_winston_1 = require("nest-winston");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../email/email.service");
const date_fns_1 = require("date-fns");
let UserService = class UserService {
    constructor(userModel, jwtService, emailService, logger) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.logger = logger;
    }
    async getAllUsers(options, filter) {
        let limit = options.limit || 10;
        let offset = options.offset || 0;
        let sort = options.sort || 'DESC';
        let sortAttr = options.sortAttr || 'createdAt';
        let search = options.search || '';
        const regex = new RegExp(search.trim(), 'i');
        let query = this.userModel
            .find({
            $or: [{ name: { $regex: regex } }, { type: { $regex: regex } }],
        })
            .select('name email status password contact type properties createdAt updatedAt verification.isVerified ')
            .limit(limit)
            .skip(offset)
            .sort({ [sortAttr]: sort === 'DESC' ? -1 : 1 });
        if (filter) {
            if (filter.status != null) {
                query = query.find({ status: filter.status });
            }
        }
        const usersCount = await this.userModel.countDocuments();
        const users = await query.exec();
        return { data: users, count: usersCount };
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
        const user = await this.userModel.findOne({ email });
        console.log(user);
        return user;
    }
    generateString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    async create(createUserDto) {
        const pass = await this.hashPassword(createUserDto.password);
        createUserDto.password = pass;
        const user = await this.userModel.create(createUserDto);
        const token = await this.generateToken({ email: user.email, id: user.id });
        const expirestAt = (0, date_fns_1.addMinutes)(new Date(), 60);
        user['verification'] = {
            token: token,
            expiry: expirestAt,
            isVerified: false,
        };
        await user.save();
        this.logger.info(`User with type ${user.type} & email ${user.email} successfully created`);
        return {
            token: user.verification.token,
            message: 'User created successfully',
        };
    }
    async verifyVerificationToken(token, email) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email');
        }
        if (!(token == user.verification.token)) {
            throw new common_1.BadRequestException('Invalid Token');
        }
        const now = new Date();
        if (!(0, date_fns_1.isBefore)(now, user.verification.expiry)) {
            this.logger.warn(`Token ${token} is expired for user with email ${email}`);
            throw new common_1.BadRequestException('Token is expired');
        }
        user['verification'] = {
            token: '',
            expiry: null,
            isVerified: true,
        };
        this.logger.info(`User with email ${email} verified successfully`);
        user.save();
        return { message: 'User verified!' };
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
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
    async loginUser(email, password) {
        const validate = await this.validateUser(email, password);
        if (!validate) {
            this.logger.warn(`Email:${email} or password is incorrect`);
            return new common_1.UnauthorizedException('Invalid Credentials');
        }
        const token = await this.generateToken({ email, id: validate.id });
        validate.isLoggedIn = true;
        console.log(token);
        validate.token = token;
        this.logger.info('User successfully logged in');
        return { message: "User logged in successfully",
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
            passwordUpdatedAt: null,
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
            throw new common_1.BadRequestException('No user found with this email');
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
        return { message: 'Password successfully changed' };
    }
    async findById(id) {
        return await this.userModel.findById(id);
    }
    async edit(updateUserDto, authUser) {
        const user = await this.findById(authUser.id);
        if (!user) {
            throw new common_1.BadRequestException('User with this id not found');
        }
        else {
            await this.userModel.findByIdAndUpdate(authUser.id, updateUserDto);
            this.logger.info('User Updated successfully!');
            return { message: 'User updated successfully!' };
        }
    }
    async updateUser(id) {
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(3, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService,
        email_service_1.EmailService,
        winston_1.Logger])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map