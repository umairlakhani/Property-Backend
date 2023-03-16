import { Status, Type } from "../schema/user.schema";
export declare class CreateUserDto {
    name: string;
    status: Status;
    email: string;
    password: string;
    contact: string;
    type: Type;
}
