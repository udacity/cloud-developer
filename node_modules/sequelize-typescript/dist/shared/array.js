"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Removes duplicates from specified array
 */
function unique(arr) {
    return arr.filter(exports.uniqueFilter);
}
exports.unique = unique;
/**
 * Returns true for items, that only exists once on an array
 */
exports.uniqueFilter = (item, index, arr) => arr.indexOf(item) === index;
//# sourceMappingURL=array.js.map