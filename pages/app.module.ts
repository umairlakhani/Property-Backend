import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from './user/schema/user.schema';
import { Connection } from 'mongoose';
import { ValidationModule } from './shared-modules/validation-module';
import { WinstonModule } from 'nest-winston';
import { PropertyModule } from './property/property.module';
import { SoldPropertyController } from './sold-property/sold-property.controller';
import { SoldPropertyModule } from './sold-property/sold-property.module';
import { SuperadminModule } from './superadmin/superadmin.module';
import { TenantModule } from './tenant/tenant.module';
import { InspectionModule } from './inspection/inspection.module';
import { PaymentModule } from './payment/payment.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';

const transportInfo = new winston.transports.DailyRotateFile({
  filename: './logs/info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  level: 'info',
});

const transportWarn = new winston.transports.DailyRotateFile({
  filename: './logs/warn-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  level: 'warn',
});

// winston.transport.on('rotate', function(oldFilename, newFilename){
//   console.log(oldFilename,"Old file name a")
//   fs.unlink('./logs/info-2022-11-22-16.log',(err) => {
//     console.log(err,"FS Error")
//   })
// })

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),

      transports: [transportInfo,transportWarn]
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configServie:ConfigService,connection:Connection)=>({
        uri:configServie.get<string>("DB_URL"),
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      }),
      
      inject: [ConfigService],
    }),

    UserModule,
    EmailModule,
    PropertyModule,
    SoldPropertyModule,
    SuperadminModule,
    TenantModule,
    InspectionModule,
    PaymentModule,
    CloudinaryModule
  ],
  controllers: [AppController, SoldPropertyController],
  providers: [AppService, JwtService, Logger ,...ValidationModule ],
})
export class AppModule {}
