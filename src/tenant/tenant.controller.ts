import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantService } from './tenant.service';

@ApiTags('Tenant')
@ApiBearerAuth('defaultBearerAuth')
@Controller('tenant')
export class TenantController {
  constructor(private tenantService: TenantService) {}
  @Post('create')
  async create(@Body() createTenantDto: CreateTenantDto) {
    return await this.tenantService.create(createTenantDto);
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
    return this.tenantService.loginUser(body.email, body.password);
  }

  @Get('verify-account/:token')
  async verify(@Param('token') token: string, @Query('email') email: string) {
    return await this.tenantService.verifyVerificationToken(token, email);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('forgot-password')
  async updatePass(@Body() forgotPassDto: ForgotPasswordDto) {
    return this.tenantService.forgotPass(forgotPassDto);
  }
  // @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        token: { type: 'string' },
        password: { type: 'string' },
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
    return await this.tenantService.changePassword(
      body.email,
      body.token,
      body.password,
      body.confirmPassword,
    );
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ) {
    return await this.tenantService.edit(id, updateTenantDto);
  }
}
