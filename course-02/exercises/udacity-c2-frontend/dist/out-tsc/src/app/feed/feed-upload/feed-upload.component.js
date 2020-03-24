import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { FeedProviderService } from '../services/feed.provider.service';
import { LoadingController, ModalController } from '@ionic/angular';
var FeedUploadComponent = /** @class */ (function () {
    function FeedUploadComponent(feed, formBuilder, loadingController, modalController) {
        this.feed = feed;
        this.formBuilder = formBuilder;
        this.loadingController = loadingController;
        this.modalController = modalController;
    }
    FeedUploadComponent.prototype.ngOnInit = function () {
        this.uploadForm = this.formBuilder.group({
            caption: new FormControl('', Validators.required)
        });
    };
    FeedUploadComponent.prototype.setPreviewDataUrl = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            _this.previewDataUrl = reader.result;
        };
        reader.readAsDataURL(file);
    };
    FeedUploadComponent.prototype.selectImage = function (event) {
        var file = event.srcElement.files;
        if (!file) {
            return;
        }
        this.file = file[0];
        this.setPreviewDataUrl(this.file);
    };
    FeedUploadComponent.prototype.onSubmit = function ($event) {
        var _this = this;
        $event.preventDefault();
        this.loadingController.create();
        if (!this.uploadForm.valid || !this.file) {
            return;
        }
        this.feed.uploadFeedItem(this.uploadForm.controls.caption.value, this.file)
            .then(function (result) {
            _this.modalController.dismiss();
            _this.loadingController.dismiss();
        });
    };
    FeedUploadComponent.prototype.cancel = function () {
        this.modalController.dismiss();
    };
    FeedUploadComponent = tslib_1.__decorate([
        Component({
            selector: 'app-feed-upload',
            templateUrl: './feed-upload.component.html',
            styleUrls: ['./feed-upload.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FeedProviderService,
            FormBuilder,
            LoadingController,
            ModalController])
    ], FeedUploadComponent);
    return FeedUploadComponent;
}());
export { FeedUploadComponent };
//# sourceMappingURL=feed-upload.component.js.map