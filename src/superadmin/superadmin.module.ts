import { forwardRef, Module } from '@nestjs/common';
import { SuperadminController } from './superadmin.controller';
import { SuperadminService } from './superadmin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SuperAdminSchema } from './schema/super-admin.schema';
import { JwtAuthGuard } from './guards/jwt-guards';
import { JwtStrategy } from './guards/jwt-strategy';
import { TenantModule } from 'src/tenant/tenant.module';
import { SuperAdminTenantModule } from './tenants/tenant.module';
import { SuperAdminUserModule } from './users/user.module';

@Module({
  imports:[
  MongooseModule.forFeature([{name:'SuperAdmin', schema: SuperAdminSchema}]),
  forwardRef(()=>UserModule),
  forwardRef(()=>SuperAdminTenantModule),
  forwardRef(()=>SuperAdminUserModule),
  forwardRef(()=>TenantModule),
  JwtModule.registerAsync({
    imports:[ConfigModule],
          inject: [ConfigService],
          useFactory: async(configService:ConfigService)=>({
            secret: configService.get('JWT_KEY'),
            signOptions: { expiresIn: '1d' }, 
          }),

  })
  ],
  controllers: [SuperadminController],
  providers: [SuperadminService, JwtAuthGuard, JwtStrategy],
  exports:[SuperadminService]
})
export class SuperadminModule {}
