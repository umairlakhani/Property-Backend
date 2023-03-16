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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const create_property_dto_1 = require("../property/dto/create-property.dto");
const property_service_1 = require("../property/property.service");
const get_token_decorator_1 = require("./decorator/get_token.decorator");
const create_user_dto_1 = require("./dto/create-user.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_guards_1 = require("./guards/jwt-guards");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, propertyService, cloudinaryService) {
        this.userService = userService;
        this.propertyService = propertyService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createUser) {
        return await this.userService.create(createUser);
    }
    async login(body) {
        console.log('working');
        return this.userService.loginUser(body.email, body.password);
    }
    async verify(token, email) {
        return await this.userService.verifyVerificationToken(token, email);
    }
    async updatePass(forgotPassDto) {
        return this.userService.forgotPass(forgotPassDto);
    }
    async changePass(body) {
        return await this.userService.changePassword(body.email, body.token, body.password, body.confirmPassword);
    }
    async edit(updateUserDto, authUser) {
        return await this.userService.edit(updateUserDto, authUser);
    }
    async addProperty(createPropertyDto, authUser, files) {
        const IMAGES = files ? await this.cloudinaryService.uploadImages(files) : [{ secure_url: '' }];
        const createPropertyDTO = Object.assign(Object.assign({}, createPropertyDto), { files: IMAGES.map((image) => image.secure_url) });
        if (createPropertyDTO.files.length < 1) {
            throw new common_1.BadRequestException("Please upload images");
        }
        return await this.propertyService.create(authUser, createPropertyDTO);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    pattern: '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$',
                },
                password: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('verify-account/:token'),
    __param(0, (0, common_1.Param)('token')),
    __param(1, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePass", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, swagger_1.ApiBody)({
        schema: {
            properties: {
                email: { type: 'string' },
                token: { type: 'string' },
                newPassword: { type: 'string' },
                confirmPassword: { type: 'string' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePass", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Post)('edit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_token_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "edit", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Post)('addProperty'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 8)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_token_decorator_1.AuthUser)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto, Object, Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addProperty", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        property_service_1.PropertyService,
        cloudinary_service_1.CloudinaryService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map