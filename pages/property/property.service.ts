import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Type } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { Logger } from 'winston';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Property } from './schema/property.schema';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: mongoose.Model<Property>,
    private userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,

  ) {}
  async validateUser(id: string) {
    return await this.userService.findById(id);
  }
  async create(authUser:any,createPropertyDto: CreatePropertyDto) {
    const user = await this.validateUser(authUser.id);
    if (!user) {
      throw new BadRequestException('No landlord/agent found with this id');
    }
    if (
      createPropertyDto.forApartment == true &&
      createPropertyDto.forHouse == true
    ) {
      console.log('both true');
      throw new BadRequestException(
        'Property must be either house or apartment',
      );
    }
    if (!createPropertyDto.forApartment && !createPropertyDto.forHouse) {
      console.log('both false');
      throw new BadRequestException(
        'Property must be either house or apartment',
      );
    }
    if (createPropertyDto.rentPurpose && createPropertyDto.rent == null) {
      throw new BadRequestException('Enter Rent for the property');
    }
    if (createPropertyDto.sellPurpose && createPropertyDto.price == null) {
      throw new BadRequestException('Enter Price for the property');
    }
    if (createPropertyDto.sellPurpose == true && createPropertyDto.rentPurpose == true) {
      console.log("both true")
      throw new BadRequestException(
        'Property can either be for rent or sell purpose',
      );
    }
    if (!createPropertyDto.sellPurpose && !createPropertyDto.rentPurpose) {
      console.log("both false")
     
      throw new BadRequestException(
        'Property can either be for rent or sell purpose',
      );
    }
    if (createPropertyDto.forApartment) {
      if (user.type == Type.agent) {
        const property = await this.propertyModel.create({
          ...createPropertyDto,
          agentId: authUser.id,
        });
        property.houseFloorPlan = null;
        user.properties = [...user.properties, property.id];
        if (createPropertyDto.rentPurpose) {
          property.price = null;
        } else {
          property.rent = null;
        }
        await property.save();
        await user.save();
        this.logger.info('Property listed successfully!');
        return {message:'Property listed successfully'}
      } else {
        const property = await this.propertyModel.create({
          ...createPropertyDto,
          landlordId: authUser.id,
        });
        user.properties.push(property.id);
        if (createPropertyDto.rentPurpose) {
          property.price = null;
        } else {
          property.rent = null;
        }
        await property.save();
        await user.save();
      this.logger.info('Property listed successfully!');
        return {message:'Property listed successfully'}
      }
    }

    if (createPropertyDto.forHouse) {
      if (user.type == Type.agent) {
        const property = await this.propertyModel.create(createPropertyDto);
        property.agentId = authUser.id;
        property.apartmentFloorPlan = null;
        user.properties.push(property.id);
        if (createPropertyDto.rentPurpose) {
          property.price = null;
        } else {
          property.rent = null;
        }
        await property.save();
        await user.save();
        return {message:'Property listed successfully'}
      } else {
        const property = await this.propertyModel.create(createPropertyDto);
        property.landlordId = authUser.id;
        user.properties.push(property.id);
        if (createPropertyDto.rentPurpose) {
          property.price = null;
        } else {
          property.rent = null;
        }
        await property.save();
        await user.save();
        return {message:'Property listed successfully'}
      }
    }
  }
}
