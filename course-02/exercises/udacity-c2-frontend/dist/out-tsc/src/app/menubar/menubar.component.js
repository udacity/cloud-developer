import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
var MenubarComponent = /** @class */ (function () {
    function MenubarComponent() {
        this.appName = environment.appName;
    }
    MenubarComponent.prototype.ngOnInit = function () { };
    MenubarComponent = tslib_1.__decorate([
        Component({
            selector: 'app-menubar',
            templateUrl: './menubar.component.html',
            styleUrls: ['./menubar.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MenubarComponent);
    return MenubarComponent;
}());
export { MenubarComponent };
//# sourceMappingURL=menubar.component.js.map