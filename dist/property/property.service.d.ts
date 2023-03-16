import mongoose from 'mongoose';
import { UserService } from 'src/user/user.service';
import { Logger } from 'winston';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './schema/property.schema';
export declare class PropertyService {
    private propertyModel;
    private userService;
    private readonly logger;
    constructor(propertyModel: mongoose.Model<Property>, userService: UserService, logger: Logger);
    validateUser(id: string): Promise<import("src/user/schema/user.schema").User & {
        _id: mongoose.Types.ObjectId;
    }>;
    create(authUser: any, createPropertyDto: CreatePropertyDto): Promise<{
        message: string;
    }>;
}
