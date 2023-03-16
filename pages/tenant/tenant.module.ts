import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from './schema/tenant.schema';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-guards';
import { JwtStrategy } from './guards/jwt-strategy';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'Tenant',schema: TenantSchema}]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService:ConfigService)=>({
              secret: configService.get('JWT_KEY'),
              signOptions: { expiresIn: '1d' }, 
            }),

    })
  ],
  controllers: [TenantController],
  providers: [TenantService, JwtAuthGuard, JwtStrategy],
  exports: [TenantService]
})
export class TenantModule {}
