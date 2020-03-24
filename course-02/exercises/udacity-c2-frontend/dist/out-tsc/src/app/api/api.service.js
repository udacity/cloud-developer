import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
var API_HOST = environment.apiHost;
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }
    ApiService.prototype.handleError = function (error) {
        alert(error.message);
    };
    ApiService.prototype.setAuthToken = function (token) {
        this.httpOptions.headers = this.httpOptions.headers.append('Authorization', "jwt " + token);
        this.token = token;
    };
    ApiService.prototype.get = function (endpoint) {
        var _this = this;
        var url = "" + API_HOST + endpoint;
        var req = this.http.get(url, this.httpOptions).pipe(map(this.extractData));
        return req
            .toPromise()
            .catch(function (e) {
            _this.handleError(e);
            throw e;
        });
    };
    ApiService.prototype.post = function (endpoint, data) {
        var _this = this;
        var url = "" + API_HOST + endpoint;
        return this.http.post(url, data, this.httpOptions)
            .toPromise()
            .catch(function (e) {
            _this.handleError(e);
            throw e;
        });
    };
    ApiService.prototype.upload = function (endpoint, file, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var signed_url, headers, req;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(endpoint + "/signed-url/" + file.name)];
                    case 1:
                        signed_url = (_a.sent()).url;
                        headers = new HttpHeaders({ 'Content-Type': file.type });
                        req = new HttpRequest('PUT', signed_url, file, {
                            headers: headers,
                            reportProgress: true,
                        });
                        return [2 /*return*/, new Promise(function (resolve) {
                                _this.http.request(req).subscribe(function (resp) {
                                    if (resp && resp.status && resp.status === 200) {
                                        resolve(_this.post(endpoint, payload));
                                    }
                                });
                            })];
                }
            });
        });
    };
    /// Utilities
    ApiService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    ApiService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map