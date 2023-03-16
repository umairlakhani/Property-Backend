import { Module } from '@nestjs/common';
import { SoldPropertyService } from './sold-property.service';

@Module({
  providers: [SoldPropertyService]
})
export class SoldPropertyModule {}
