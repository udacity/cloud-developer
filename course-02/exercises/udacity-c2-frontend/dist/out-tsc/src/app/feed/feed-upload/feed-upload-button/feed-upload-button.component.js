import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedUploadComponent } from '../feed-upload.component';
import { AuthService } from 'src/app/auth/services/auth.service';
var FeedUploadButtonComponent = /** @class */ (function () {
    function FeedUploadButtonComponent(modalController, auth) {
        this.modalController = modalController;
        this.auth = auth;
    }
    FeedUploadButtonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.currentUser$.subscribe(function (user) {
            _this.isLoggedIn = user !== null;
        });
    };
    FeedUploadButtonComponent.prototype.ngOnDestroy = function () {
        if (this.loginSub) {
            this.loginSub.unsubscribe();
        }
    };
    FeedUploadButtonComponent.prototype.presentUploadForm = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: FeedUploadComponent,
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FeedUploadButtonComponent = tslib_1.__decorate([
        Component({
            selector: 'app-feed-upload-button',
            templateUrl: './feed-upload-button.component.html',
            styleUrls: ['./feed-upload-button.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, AuthService])
    ], FeedUploadButtonComponent);
    return FeedUploadButtonComponent;
}());
export { FeedUploadButtonComponent };
//# sourceMappingURL=feed-upload-button.component.js.map