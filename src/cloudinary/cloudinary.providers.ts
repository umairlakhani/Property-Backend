import { ConfigService } from '@nestjs/config';
import {v2} from 'cloudinary';

export const CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: (configService: ConfigService) => {
        return v2.config({
            cloud_name: 'dzrjoecqe',
            api_key: '286523288968227',
            api_secret: 'paD2pBYbjjU_a4wwd3uyYEB6-40'
        })
    }
}