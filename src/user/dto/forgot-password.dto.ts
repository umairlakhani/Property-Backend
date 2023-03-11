import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsEmail} from 'class-validator';


export class ForgotPasswordDto {

    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    @IsEmail()
    email: string;
}