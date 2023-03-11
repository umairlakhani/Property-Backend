import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertySchema } from './schema/property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:"Property",schema:PropertySchema}]),
    forwardRef(()=>UserModule),
    
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService]
})
export class PropertyModule {}
