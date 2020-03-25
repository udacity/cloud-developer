import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedUploadComponent } from './feed-upload/feed-upload.component';
import { FeedUploadButtonComponent } from './feed-upload/feed-upload-button/feed-upload-button.component';
import { FeedProviderService } from './services/feed.provider.service';
var entryComponents = [FeedUploadComponent];
var components = [FeedListComponent, FeedItemComponent, FeedUploadComponent, FeedUploadButtonComponent];
var FeedModule = /** @class */ (function () {
    function FeedModule() {
    }
    FeedModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule
            ],
            declarations: components,
            exports: components,
            entryComponents: entryComponents,
            providers: [FeedProviderService]
        })
    ], FeedModule);
    return FeedModule;
}());
export { FeedModule };
//# sourceMappingURL=feed.module.js.map