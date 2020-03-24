import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthMenuUserComponent } from './auth-menu-user/auth-menu-user.component';
import { AuthService } from '../services/auth.service';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { AuthRegisterComponent } from '../auth-register/auth-register.component';
var AuthMenuButtonComponent = /** @class */ (function () {
    function AuthMenuButtonComponent(auth, modalController) {
        this.auth = auth;
        this.modalController = modalController;
    }
    AuthMenuButtonComponent.prototype.presentmodal = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: AuthMenuUserComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthMenuButtonComponent.prototype.presentLogin = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: AuthLoginComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthMenuButtonComponent.prototype.presentRegister = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: AuthRegisterComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthMenuButtonComponent.prototype.logout = function () {
        this.auth.logout();
    };
    AuthMenuButtonComponent.prototype.ngOnInit = function () { };
    AuthMenuButtonComponent = tslib_1.__decorate([
        Component({
            selector: 'app-auth-menu-button',
            templateUrl: './auth-menu-button.component.html',
            styleUrls: ['./auth-menu-button.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            ModalController])
    ], AuthMenuButtonComponent);
    return AuthMenuButtonComponent;
}());
export { AuthMenuButtonComponent };
//# sourceMappingURL=auth-menu-button.component.js.map