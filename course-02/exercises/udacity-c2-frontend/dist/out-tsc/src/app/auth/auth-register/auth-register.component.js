import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
var AuthRegisterComponent = /** @class */ (function () {
    function AuthRegisterComponent(formBuilder, auth, modal) {
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.modal = modal;
    }
    AuthRegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            password_confirm: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+$')
            ]))
        }, { validators: this.passwordsMatch });
    };
    AuthRegisterComponent.prototype.onSubmit = function ($event) {
        var _this = this;
        $event.preventDefault();
        if (!this.registerForm.valid) {
            return;
        }
        var newuser = {
            email: this.registerForm.controls.email.value,
            name: this.registerForm.controls.name.value
        };
        this.auth.register(newuser, this.registerForm.controls.password.value)
            .then(function (user) {
            _this.modal.dismiss();
        })
            .catch(function (e) {
            _this.error = e.statusText;
            throw e;
        });
    };
    AuthRegisterComponent.prototype.passwordsMatch = function (group) {
        return group.controls.password.value === group.controls.password_confirm.value ? null : { passwordsMisMatch: true };
    };
    AuthRegisterComponent = tslib_1.__decorate([
        Component({
            selector: 'app-auth-register',
            templateUrl: './auth-register.component.html',
            styleUrls: ['./auth-register.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            AuthService,
            ModalController])
    ], AuthRegisterComponent);
    return AuthRegisterComponent;
}());
export { AuthRegisterComponent };
//# sourceMappingURL=auth-register.component.js.map