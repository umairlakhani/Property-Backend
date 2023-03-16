import mongoose from "mongoose";
import { IFilters, IPagination } from "src/user/model/user.model";
import { User } from "src/user/schema/user.schema";
export declare class SuperAdminUserService {
    private userModel;
    constructor(userModel: mongoose.Model<User>);
    getAllUsers(options: IPagination, filter: IFilters): Promise<{
        data: (User & {
            _id: mongoose.Types.ObjectId;
        })[];
        count: number;
    }>;
    getUserById(id: string): Promise<User & {
        _id: mongoose.Types.ObjectId;
    }>;
}
