import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IFilters, IPagination } from "src/user/model/user.model";
import { User } from "src/user/schema/user.schema";

@Injectable()
export class SuperAdminUserService{
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,

    ){}
    async getAllUsers(options:IPagination,filter:IFilters) {
        let limit = options.limit || 10;
        let offset = options.offset || 0;
        let sort = options.sort || 'DESC';
        let sortAttr = options.sortAttr || 'createdAt';
        let search = options.search || '';
        const regex = new RegExp(search.trim(),'i');
        let query = this.userModel.find({
              $or: [
                { name: { $regex: regex } },
                { type: { $regex: regex } }
              ]
        })
        .select('name email status password contact type properties createdAt updatedAt verification.isVerified ')
        .limit(limit)
        .skip(offset)
        .sort({ [sortAttr]: sort === 'DESC' ? -1 : 1 })
    
        if(filter){
          if(filter.status!=null){
            query = query.find({ status: filter.status });
          }
        }
        const usersCount = await this.userModel.countDocuments()
        const users = await query.exec()
        return {data:users, count:usersCount}
      // }
    }

    async getUserById(id:string){
        const user =  await this.userModel.findById(id)
        .select("name email contact type properties createdAt updatedAt verification.isVerified verification.token")
        if(!user){
          throw new BadRequestException("No user found with this id")
          // return "No user found with this id"
        } 
        return user
    }
}