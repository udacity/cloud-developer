"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize = require("sequelize");
/**
 * Version of sequelize
 */
exports.version = sequelize['version'];
/**
 * Parsed version number of sequelize version
 */
exports.majorVersion = parseInt(exports.version, 10);
//# sourceMappingURL=versioning.js.map