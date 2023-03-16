/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Sort, SortAttr } from "src/user/model/user.model";
import { SuperAdminUserService } from "./user.service";
export declare class SuperAdminUserController {
    private superAdminUserService;
    constructor(superAdminUserService: SuperAdminUserService);
    getAll(limit?: number, offset?: number, search?: string, sortAttr?: SortAttr, sort?: Sort, status?: string): Promise<{
        data: (import("src/user/schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
    }>;
    getUser(id: string): Promise<import("src/user/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
