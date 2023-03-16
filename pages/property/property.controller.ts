import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PropertyService } from './property.service';
@ApiTags('User')
@ApiBearerAuth('defaultBearerAuth')
@Controller('property')
export class PropertyController {
    constructor(
        private propertyService:PropertyService
    ){}
    // @Post

   
}
