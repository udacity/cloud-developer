import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
var AuthMenuUserComponent = /** @class */ (function () {
    function AuthMenuUserComponent(modalCtrl) {
        this.modalCtrl = modalCtrl;
    }
    AuthMenuUserComponent.prototype.ngOnInit = function () { };
    AuthMenuUserComponent.prototype.dismissModal = function () {
        this.modalCtrl.dismiss();
    };
    AuthMenuUserComponent = tslib_1.__decorate([
        Component({
            selector: 'app-auth-menu-user',
            templateUrl: './auth-menu-user.component.html',
            styleUrls: ['./auth-menu-user.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController])
    ], AuthMenuUserComponent);
    return AuthMenuUserComponent;
}());
export { AuthMenuUserComponent };
//# sourceMappingURL=auth-menu-user.component.js.map