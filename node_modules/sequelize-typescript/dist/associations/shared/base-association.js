"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseAssociation {
    constructor(associatedClassGetter, options) {
        this.associatedClassGetter = associatedClassGetter;
        this.options = options;
    }
    getAssociatedClass() {
        return this.associatedClassGetter();
    }
    getAs() {
        return this.options.as;
    }
}
exports.BaseAssociation = BaseAssociation;
//# sourceMappingURL=base-association.js.map