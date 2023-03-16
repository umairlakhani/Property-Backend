"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationModule = void 0;
const isTenant_alreadyExists_constraint_1 = require("../tenant/constraints/isTenant-alreadyExists.constraint");
const isUser_alreadyExists_constraint_1 = require("../user/constraints/isUser-alreadyExists.constraint");
const isUserId_alreadyExists_constraint_1 = require("../user/constraints/isUserId-alreadyExists.constraint");
exports.ValidationModule = [
    isUser_alreadyExists_constraint_1.IsUserAlreadyExistConstraint,
    isTenant_alreadyExists_constraint_1.IsTenantAlreadyExistConstraint,
    isUserId_alreadyExists_constraint_1.IsUserIdAlreadyExistConstraint
];
//# sourceMappingURL=validation-module.js.map