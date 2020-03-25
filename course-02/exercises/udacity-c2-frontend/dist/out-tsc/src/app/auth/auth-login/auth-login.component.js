import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
var AuthLoginComponent = /** @class */ (function () {
    function AuthLoginComponent(formBuilder, auth, modal) {
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.modal = modal;
    }
    AuthLoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            password: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
    };
    AuthLoginComponent.prototype.onSubmit = function ($event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                $event.preventDefault();
                if (!this.loginForm.valid) {
                    return [2 /*return*/];
                }
                this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
                    .then(function (user) {
                    _this.modal.dismiss();
                })
                    .catch(function (e) {
                    _this.error = e.statusText;
                    throw e;
                });
                return [2 /*return*/];
            });
        });
    };
    AuthLoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-auth-login',
            templateUrl: './auth-login.component.html',
            styleUrls: ['./auth-login.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            AuthService,
            ModalController])
    ], AuthLoginComponent);
    return AuthLoginComponent;
}());
export { AuthLoginComponent };
//# sourceMappingURL=auth-login.component.js.map