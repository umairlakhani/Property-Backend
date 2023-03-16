"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthUser = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const userId = await request.user.id;
    console.log(userId, "User Id");
    return request.user;
});
//# sourceMappingURL=get_token.decorator.js.map