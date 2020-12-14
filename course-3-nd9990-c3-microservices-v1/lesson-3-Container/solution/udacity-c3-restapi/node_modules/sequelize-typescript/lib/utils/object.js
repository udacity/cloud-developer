"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function deepAssign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        Object
            .getOwnPropertyNames(source)
            .forEach(function (key) { return assign(key, target, source); });
        /* istanbul ignore next */
        if (Object.getOwnPropertySymbols) {
            Object
                .getOwnPropertySymbols(source)
                .forEach(function (key) { return assign(key, target, source); });
        }
    });
    return target;
    function assign(key, _target, _source) {
        var sourceValue = _source[key];
        if (sourceValue !== void 0) {
            var targetValue_1 = _target[key];
            if (Array.isArray(sourceValue)) {
                if (!Array.isArray(targetValue_1)) {
                    targetValue_1 = [];
                }
                var length_1 = targetValue_1.length;
                sourceValue.forEach(function (_, index) { return assign(length_1 + index, targetValue_1, sourceValue); });
            }
            else if (typeof sourceValue === 'object') {
                if (sourceValue instanceof RegExp) {
                    targetValue_1 = cloneRegExp(sourceValue);
                }
                else if (sourceValue instanceof Date) {
                    targetValue_1 = new Date(sourceValue);
                }
                else if (sourceValue === null) {
                    targetValue_1 = null;
                }
                else {
                    if (!targetValue_1) {
                        targetValue_1 = Object.create(sourceValue.constructor.prototype);
                    }
                    deepAssign(targetValue_1, sourceValue);
                }
            }
            else {
                targetValue_1 = sourceValue;
            }
            _target[key] = targetValue_1;
        }
    }
}
exports.deepAssign = deepAssign;
/**
 * I clone the given RegExp object, and ensure that the given flags exist on
 * the clone. The injectFlags parameter is purely additive - it cannot remove
 * flags that already exist on the
 *
 * @param input RegExp - I am the regular expression object being cloned.
 * @param injectFlags String( Optional ) - I am the flags to enforce on the clone.
 * @source https://www.bennadel.com/blog/2664-cloning-regexp-regular-expression-objects-in-javascript.htm
 */
function cloneRegExp(input, injectFlags) {
    var pattern = input.source;
    var flags = "";
    // Make sure the parameter is a defined string - it will make the conditional
    // logic easier to read.
    injectFlags = (injectFlags || "");
    // Test for global.
    if (input.global || (/g/i).test(injectFlags)) {
        flags += "g";
    }
    // Test for ignoreCase.
    if (input.ignoreCase || (/i/i).test(injectFlags)) {
        flags += "i";
    }
    // Test for multiline.
    if (input.multiline || (/m/i).test(injectFlags)) {
        flags += "m";
    }
    // Return a clone with the additive flags.
    return (new RegExp(pattern, flags));
}
exports.cloneRegExp = cloneRegExp;
function getAllPropertyNames(obj) {
    var names = [];
    do {
        names.push.apply(names, Object.getOwnPropertyNames(obj));
        obj = Object.getPrototypeOf(obj);
    } while (obj !== Object.prototype);
    var exists = {};
    return names.filter(function (name) {
        var isValid = !exists[name] && name !== 'constructor';
        exists[name] = true;
        return isValid;
    });
}
exports.getAllPropertyNames = getAllPropertyNames;
/**
 * Extends target constructor function members and prototype members
 * by specified  source members
 */
function extend(target, source) {
    // copies all prototype members of this to target.prototype
    Object
        .keys(source.prototype)
        .forEach(function (name) { return target.prototype[name] = source.prototype[name]; });
    // copies all static members of this to target
    Object
        .keys(source)
        .forEach(function (name) { return target[name] = source[name]; });
}
exports.extend = extend;
//# sourceMappingURL=object.js.map