import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePropertyDto } from 'src/property/dto/create-property.dto';
import { PropertyService } from 'src/property/property.service';
import { Logger } from 'winston';
import { AuthUser } from './decorator/get_token.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './guards/jwt-guards';
import { Sort, SortAttr } from './model/user.model';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth('defaultBearerAuth')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private propertyService:PropertyService,
    private cloudinaryService: CloudinaryService
    ) {}
  @Post('create')
  async create(@Body() createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          pattern: '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$',
        },
        password: { type: 'string' },
      },
    },
  })
  async login(@Body() body: { email: string; password: string }) {
    console.log('working');
    return this.userService.loginUser(body.email, body.password);
  }

  @Get('verify-account/:token')
  async verify(@Param('token') token: string, @Query('email') email: string) {
    return await this.userService.verifyVerificationToken(token, email);
  }

  @Post('forgot-password')
  async updatePass(@Body() forgotPassDto: ForgotPasswordDto) {
    return this.userService.forgotPass(forgotPassDto);
  }
  @Post('change-password')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        token: { type: 'string' },
        newPassword: { type: 'string' },
        confirmPassword: { type: 'string' },
      },
    },
  })
  async changePass(
    @Body()
    body: {
      email: string;
      token: string;
      password: string;
      confirmPassword: string;
    },
  ) {
    return await this.userService.changePassword(
      body.email,
      body.token,
      body.password,
      body.confirmPassword,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async edit(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser,
    ) {
    return await this.userService.edit(updateUserDto,authUser);
  }

// @ApiTags('Property')
// @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Post('addProperty')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files',8))
  async addProperty(
    @Body() createPropertyDto:CreatePropertyDto,
    @AuthUser() authUser,
    @UploadedFiles() files:Array<Express.Multer.File>
  )
  {
    const IMAGES = files ? await this.cloudinaryService.uploadImages(files):[{secure_url: ''}] 
    const createPropertyDTO = {...createPropertyDto,files:IMAGES.map((image)=>image.secure_url)}
      if(createPropertyDTO.files.length<1){
        throw new BadRequestException("Please upload images")
      }  
    return await this.propertyService.create(authUser,createPropertyDTO)
  }
}
