"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_service_1 = require("../shared/model-service");
function Table(arg) {
    if (typeof arg === 'function') {
        annotate(arg);
    }
    else {
        const options = Object.assign({}, arg);
        return (target) => annotate(target, options);
    }
}
exports.Table = Table;
function annotate(target, options = {}) {
    model_service_1.setModelName(target.prototype, options.modelName || target.name);
    model_service_1.addOptions(target.prototype, options);
}
//# sourceMappingURL=table.js.map