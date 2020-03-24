import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../api/api.service';
var FeedProviderService = /** @class */ (function () {
    function FeedProviderService(api) {
        this.api = api;
        this.currentFeed$ = new BehaviorSubject([]);
    }
    FeedProviderService.prototype.getFeed = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, items;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.get('/feed')];
                    case 1:
                        req = _a.sent();
                        items = req.rows;
                        this.currentFeed$.next(items);
                        return [2 /*return*/, Promise.resolve(this.currentFeed$)];
                }
            });
        });
    };
    FeedProviderService.prototype.uploadFeedItem = function (caption, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res, feed;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.upload('/feed', file, { caption: caption, url: file.name })];
                    case 1:
                        res = _a.sent();
                        feed = [res].concat(this.currentFeed$.value);
                        this.currentFeed$.next(feed);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    FeedProviderService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ApiService])
    ], FeedProviderService);
    return FeedProviderService;
}());
export { FeedProviderService };
// async getFeed() {
//   const url = `${API_HOST}/feed`;
//   const req = this.http.get(url, this.httpOptions).pipe(
//     map(this.extractData));
//     // catchError(this.handleError));
//   const resp = <any> (await req.toPromise());
//   return resp.rows;
// }
//# sourceMappingURL=feed.provider.service.js.map