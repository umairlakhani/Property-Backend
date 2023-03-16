import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/email/email.module';
import { JwtAuthGuard } from './guards/jwt-guards';
import { JwtStrategy } from './guards/jwt-strategy';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { PropertyModule } from 'src/property/property.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'User', schema: UserSchema}]),
    forwardRef(()=>EmailModule),
    forwardRef(()=>PropertyModule),
    JwtModule.registerAsync({
      imports:[ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService:ConfigService)=>({
              secret: configService.get('JWT_KEY'),
              signOptions: { expiresIn: '1d' }, 
            }),

    })
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
