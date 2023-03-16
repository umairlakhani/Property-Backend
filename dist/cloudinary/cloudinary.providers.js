"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: (configService) => {
        return cloudinary_1.v2.config({
            cloud_name: 'dzrjoecqe',
            api_key: '286523288968227',
            api_secret: 'paD2pBYbjjU_a4wwd3uyYEB6-40'
        });
    }
};
//# sourceMappingURL=cloudinary.providers.js.map