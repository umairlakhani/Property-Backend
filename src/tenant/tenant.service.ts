import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from './schema/tenant.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { addMinutes, isBefore } from 'date-fns';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ITenantFilters, ITenantPagination } from './model/tenant.model';
import { UpdateTenantDto } from './dto/update-tenant.dto';

export interface IUser {
  email: string;
  id: string;
}

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name)
    private tenantModel: mongoose.Model<Tenant>,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  // async getTenantById(id:string){
  //   const tenant =  await this.tenantModel.findById(id)
  //   .select("name email contact status properties createdAt verification.isVerified verification.token")
  //   console.log(id)
  //   if(!tenant){
  //     throw new BadRequestException("No tenant found with this id")
  //   }
  //   return tenant
  // }
  async findByEmail(email: string) {
    return await this.tenantModel.findOne({ email });
  }
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  async generateToken(user: IUser) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }
  async comparePassword(enteredPassword: string, dbPassword: string) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
  async validateUser(email: string, pass: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequestException(['User not found']);
    }
    const matchPass = await this.comparePassword(pass, user.password);
    if (!matchPass) {
      throw new BadRequestException(['Password incorrect']);
    }
    const { password, ...result } = user;
    return result;
  }
  async verifyVerificationToken(token: string, email: string) {
    const user = await this.tenantModel.findOne({ email });
    const now = new Date();
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    if (!(token == user.verification.token)) {
      throw new BadRequestException('Invalid Token');
    }
    if (!isBefore(now, user.verification.expiry)) {
      this.logger.warn(
        `Token ${token} is expired for Tenant with email ${email}`,
      );
      throw new BadRequestException('Token is expired');
    }
    user['verification'] = {
      token: '',
      expiry: null,
      isVerified: true,
    };
    this.logger.info(`Tenant with email ${email} verified successfully`);

    user.save();
    return 'Tenant verified!';
  }
  async forgotPass(forgotPassDto: ForgotPasswordDto) {
    const user = await this.findByEmail(forgotPassDto.email);
    if (!user) {
      this.logger.warn(`Email:${forgotPassDto.email} is incorrect`);
      throw new BadRequestException('Invalid email address');
    }
    const token = await this.generateToken({ email: user.email, id: user.id });
    const expirestAt = addMinutes(new Date(), 60);
    user.passwordUpdate = {
      token: token,
      expiry: expirestAt,
      passwordUpdatedAt: null,
    };
    await user.save();
    return {token:token}
  }
  async create(createTenantDto: CreateTenantDto) {
    const pass = await this.hashPassword(createTenantDto.password);
    createTenantDto.password = pass;
    const user = await this.tenantModel.create(createTenantDto);
    const token = await this.generateToken({ email: user.email, id: user.id });
    const expirestAt = addMinutes(new Date(), 60);
    user['verification'] = {
      token: token,
      expiry: expirestAt,
      isVerified: false,
    };

    await user.save();
    this.logger.info('Tenant created successfully!');
    return {message:"Tenant created successfully!", token:user.verification.token}
  }
  async loginUser(email: string, password: string) {
    const validate = await this.validateUser(email, password);
    if (!validate) {
      this.logger.warn(`Email:${email} or password is incorrect`);
      return new UnauthorizedException('Invalid Credentials');
    }
    validate.isLoggedIn = true;
    const token = await this.generateToken({ email, id: validate.id });
    this.logger.info('Tenant successfully logged in!');
    return { message: 'Tenant Logged in successfully!', token: token };
  }
  async changePassword(
    email: string,
    token: string,
    password: string,
    confirmPassword: string,
  ) {
    if (password.length < 8) {
      throw new BadRequestException([
        'Password length must be of 8 characters',
      ]);
    }
    if (!(password == confirmPassword)) {
      throw new BadRequestException([
        'Password and confirm password must be same',
      ]);
    }

    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequestException('No tenant found with this email');
    }

    const tokenVerify = user.passwordUpdate.token == token;
    if (!tokenVerify) {
      throw new BadRequestException(['Invalid token']);
    }

    const now = new Date();
    if (!isBefore(now, user.passwordUpdate.expiry)) {
      throw new BadRequestException(['Token expired']);
    }

    const pass = await this.hashPassword(password);
    user.password = pass;
    user.passwordUpdate.token = '';
    user.passwordUpdate.expiry = null;
    user.passwordUpdate.passwordUpdatedAt = new Date();
    await user.save();
    this.logger.info('Password changed successfully');
    return 'Password successfully changed';
  }
  async findById(id: string) {
    return await this.tenantModel.findById(id);
  }

  async edit(id: string, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.findById(id);
    if (!tenant) {
      throw new BadRequestException('Tenant with this id not found');
    }
    await this.tenantModel.findByIdAndUpdate(id, updateTenantDto);
    this.logger.info('Tenant updated successfully!');
    return 'Tenant updated successfully!';
  }
}
