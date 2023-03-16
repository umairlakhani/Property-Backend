import { BadRequestException, Inject, Injectable } from '@nestjs/common';
// import { JwtService }    from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { EmailService } from 'src/email/email.service';
import { IPagination } from 'src/user/model/user.model';
import { User } from 'src/user/schema/user.schema';
import { IUser, UserService } from 'src/user/user.service';
import { Logger } from 'winston';
import { CreateSuperAdminDto } from './dto/create-superadmin.dto';
import { SuperAdmin } from './schema/super-admin.schema';
import { ISuperadmin } from './superadmin.controller';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtService } from '@nestjs/jwt';
import { addMinutes, isBefore } from 'date-fns';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private superAdminModel: mongoose.Model<SuperAdmin>,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private userService: UserService,
  ) {}
  async createSuperAdmin(createSuperAdmin: CreateSuperAdminDto) {
    const pass = await this.userService.hashPassword(createSuperAdmin.password);
    createSuperAdmin.password = pass;
    const superAdmin = await this.superAdminModel.create(createSuperAdmin);
    this.logger.info('Super admin created successfully!');
    return {message:'Super admin created successfully!'}
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
  async findByEmail(email: string) {
    const user = await this.superAdminModel.findOne({ email });
    console.log(user);
    return user;
  }
  async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
  async superAdminLogin(creds: ISuperadmin) {
    const exists = await this.findByEmail(creds.email);

    if (!exists) {
      throw new BadRequestException('No super admin with this email');
    }
    const matchPass = await this.comparePassword(
      creds.password,
      exists.password,
    );

    if (!matchPass) {
      throw new BadRequestException('Password Incorrect');
    }
    const token = await this.userService.generateToken({
      email: creds.email,
      id: exists.id,
    });
    exists.token = token;
    await exists.save();
    this.logger.info('Superadmin loggedin successfully!');

    return {message:"Logged in successfully",
    token:token};
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
      passwordUpdatedAt:null
    };
    await user.save();
    return {token:token};
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
      throw new BadRequestException('No superadmin found with this email');
    }
    const pass = await this.hashPassword(password);
    const tokenVerify = user.passwordUpdate.token == token;
    const now = new Date();
    if (!tokenVerify) {
      throw new BadRequestException(['Invalid token']);
    }
    if (!isBefore(now, user.passwordUpdate.expiry)) {
      throw new BadRequestException(['Token expired']);
    }
    user.password = pass;
    user.passwordUpdate.token = '';
    user.passwordUpdate.expiry = null;
    user.passwordUpdate.passwordUpdatedAt = new Date()
    await user.save();
    this.logger.info('Password changed successfully');
    return {message:'Password successfully changed'}
  }
}
