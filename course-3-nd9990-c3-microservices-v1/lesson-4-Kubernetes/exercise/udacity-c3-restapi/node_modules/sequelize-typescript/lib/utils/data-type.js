"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataType_1 = require("../enums/DataType");
/*
 * Checks if specified value is a sequelize data type (ABSTRACT, STRING...)
 */
function isDataType(value) {
    return value === DataType_1.DataType.ABSTRACT ||
        value === DataType_1.DataType.NUMBER ||
        (typeof value === 'function' &&
            value({}) instanceof DataType_1.DataType.ABSTRACT) ||
        value instanceof DataType_1.DataType.ABSTRACT;
}
exports.isDataType = isDataType;
/**
 * Infers sequelize data type by design type
 */
function inferDataType(designType) {
    switch (designType) {
        case String:
            return DataType_1.DataType.STRING;
        case Number:
            return DataType_1.DataType.INTEGER;
        case Boolean:
            return DataType_1.DataType.BOOLEAN;
        case Date:
            return DataType_1.DataType.DATE;
        case Buffer:
            return DataType_1.DataType.BLOB;
        default:
            return void 0;
    }
}
exports.inferDataType = inferDataType;
//# sourceMappingURL=data-type.js.map