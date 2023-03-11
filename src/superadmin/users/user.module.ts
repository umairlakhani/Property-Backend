import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/user/schema/user.schema";
import { SuperAdminUserController } from "./user.controller";
import { SuperAdminUserService } from "./user.service";

@Module({
    imports:[
      MongooseModule.forFeature([{name:'User',schema: UserSchema}]),
    ],
    controllers:[SuperAdminUserController],
    providers: [SuperAdminUserService],
    exports: [SuperAdminUserService]
})
export class SuperAdminUserModule{}