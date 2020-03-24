import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
var JWT_LOCALSTORE_KEY = 'jwt';
var USER_LOCALSTORE_KEY = 'user';
var AuthService = /** @class */ (function () {
    function AuthService(api) {
        this.api = api;
        this.currentUser$ = new BehaviorSubject(null);
        this.initToken();
    }
    AuthService.prototype.initToken = function () {
        var token = localStorage.getItem(JWT_LOCALSTORE_KEY);
        var user = JSON.parse(localStorage.getItem(USER_LOCALSTORE_KEY));
        if (token && user) {
            this.setTokenAndUser(token, user);
        }
    };
    AuthService.prototype.setTokenAndUser = function (token, user) {
        localStorage.setItem(JWT_LOCALSTORE_KEY, token);
        localStorage.setItem(USER_LOCALSTORE_KEY, JSON.stringify(user));
        this.api.setAuthToken(token);
        this.currentUser$.next(user);
    };
    AuthService.prototype.login = function (email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.api.post('/users/auth/login', { email: email, password: password })
                        .then(function (res) {
                        _this.setTokenAndUser(res.token, res.user);
                        return res;
                    })
                        .catch(function (e) { throw e; })];
            });
        });
    };
    AuthService.prototype.logout = function () {
        this.setTokenAndUser(null, null);
        return true;
    };
    AuthService.prototype.register = function (user, password) {
        var _this = this;
        return this.api.post('/users/auth/', { email: user.email, password: password })
            .then(function (res) {
            _this.setTokenAndUser(res.token, res.user);
            return res;
        })
            .catch(function (e) { throw e; });
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map