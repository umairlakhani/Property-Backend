import { IsTenantAlreadyExistConstraint } from "src/tenant/constraints/isTenant-alreadyExists.constraint";
import { IsUserAlreadyExistConstraint } from "src/user/constraints/isUser-alreadyExists.constraint";
import { IsUserIdAlreadyExistConstraint } from "src/user/constraints/isUserId-alreadyExists.constraint";

export const ValidationModule = [
    IsUserAlreadyExistConstraint,
    IsTenantAlreadyExistConstraint,
    IsUserIdAlreadyExistConstraint
]