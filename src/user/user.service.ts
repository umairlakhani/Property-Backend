import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Logger } from 'winston';

import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { addMinutes, isBefore } from 'date-fns';
import { IFilters, IPagination } from './model/user.model';
import {
  ITenantFilters,
  ITenantPagination,
} from 'src/tenant/model/tenant.model';
import { UpdateUserDto } from './dto/update-user.dto';

export interface IUser {
  email: string;
  id: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAllUsers(options: IPagination, filter: IFilters) {
    let limit = options.limit || 10;
    let offset = options.offset || 0;
    let sort = options.sort || 'DESC';
    let sortAttr = options.sortAttr || 'createdAt';
    let search = options.search || '';
    const regex = new RegExp(search.trim(), 'i');
    let query = this.userModel
      .find({
        $or: [{ name: { $regex: regex } }, { type: { $regex: regex } }],
      })
      .select(
        'name email status password contact type properties createdAt updatedAt verification.isVerified ',
      )
      .limit(limit)
      .skip(offset)
      .sort({ [sortAttr]: sort === 'DESC' ? -1 : 1 });

    if (filter) {
      if (filter.status != null) {
        query = query.find({ status: filter.status });
      }
    }
    const usersCount = await this.userModel.countDocuments();
    const users = await query.exec();
    return { data: users, count: usersCount };
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
    const user = await this.userModel.findOne({ email });
    console.log(user);
    return user;
  }
  generateString(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  async create(createUserDto: CreateUserDto) {
    const pass = await this.hashPassword(createUserDto.password);
    createUserDto.password = pass;
    const user = await this.userModel.create(createUserDto);
    const token = await this.generateToken({ email: user.email, id: user.id });
    const expirestAt = addMinutes(new Date(), 60);
    user['verification'] = {
      token: token,
      expiry: expirestAt,
      isVerified: false,
    };

    await user.save();
    // const msg = {
    //     to: user.email,
    //     subject: 'Greeting Message from NestJS Sendgrid',
    //     from: 'sp22mscb0001@maju.edu.pk',
    //     text: 'Hello World from NestJS Sendgrid',
    //     html: '<h1>Hello World from NestJS Sendgrid</h1>'

    // }
    // await this.emailService.send(msg)
    // return user;
    this.logger.info(
      `User with type ${user.type} & email ${user.email} successfully created`,
    );
    return {
      token: user.verification.token,
      message: 'User created successfully',
    };
  }
  async verifyVerificationToken(token: string, email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    if (!(token == user.verification.token)) {
      throw new BadRequestException('Invalid Token');
    }

    const now = new Date();
    if (!isBefore(now, user.verification.expiry)) {
      this.logger.warn(
        `Token ${token} is expired for user with email ${email}`,
      );
      throw new BadRequestException('Token is expired');
    }

    user['verification'] = {
      token: '',
      expiry: null,
      isVerified: true,
    };
    this.logger.info(`User with email ${email} verified successfully`);

    user.save();
    return {message:'User verified!'}
  }
  async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
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
  async loginUser(email: string, password: string) {
    const validate = await this.validateUser(email, password);
    if (!validate) {
      this.logger.warn(`Email:${email} or password is incorrect`);
      return new UnauthorizedException('Invalid Credentials');
    }
    const token = await this.generateToken({ email, id: validate.id });
    validate.isLoggedIn = true;
    console.log(token)
    validate.token = token;
    // await validate.save()
    this.logger.info('User successfully logged in');
    return {message:"User logged in successfully",
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
      passwordUpdatedAt: null,
    };
    await user.save();
    return {token:token}
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
      throw new BadRequestException('No user found with this email');
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
    return {message:'Password successfully changed'}
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }
  async edit(updateUserDto: UpdateUserDto,authUser:any,) {
    const user = await this.findById(authUser.id);
    if (!user) {
      throw new BadRequestException('User with this id not found');
    } else {
      await this.userModel.findByIdAndUpdate(authUser.id, updateUserDto);
    this.logger.info('User Updated successfully!');
      return {message: 'User updated successfully!'}
    }
  }

  async updateUser(id:string){
    
  }
}
