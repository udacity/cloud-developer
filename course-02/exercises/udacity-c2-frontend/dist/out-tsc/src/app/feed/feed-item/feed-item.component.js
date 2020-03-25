import * as tslib_1 from "tslib";
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
var FeedItemComponent = /** @class */ (function () {
    function FeedItemComponent() {
    }
    FeedItemComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], FeedItemComponent.prototype, "feedItem", void 0);
    FeedItemComponent = tslib_1.__decorate([
        Component({
            selector: 'app-feed-item',
            templateUrl: './feed-item.component.html',
            styleUrls: ['./feed-item.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FeedItemComponent);
    return FeedItemComponent;
}());
export { FeedItemComponent };
//# sourceMappingURL=feed-item.component.js.map