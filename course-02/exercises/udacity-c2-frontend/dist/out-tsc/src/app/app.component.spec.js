var _this = this;
import * as tslib_1 from "tslib";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
describe('AppComponent', function () {
    var statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
    beforeEach(async(function () {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
            ],
            imports: [RouterTestingModule.withRoutes([])],
        }).compileComponents();
    }));
    it('should create the app', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fixture, app;
        return tslib_1.__generator(this, function (_a) {
            fixture = TestBed.createComponent(AppComponent);
            app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
    it('should initialize the app', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TestBed.createComponent(AppComponent);
                    expect(platformSpy.ready).toHaveBeenCalled();
                    return [4 /*yield*/, platformReadySpy];
                case 1:
                    _a.sent();
                    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
                    expect(splashScreenSpy.hide).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have menu labels', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fixture, app, menuItems;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestBed.createComponent(AppComponent)];
                case 1:
                    fixture = _a.sent();
                    return [4 /*yield*/, fixture.detectChanges()];
                case 2:
                    _a.sent();
                    app = fixture.nativeElement;
                    menuItems = app.querySelectorAll('ion-label');
                    expect(menuItems.length).toEqual(1);
                    expect(menuItems[0].textContent).toContain('Home');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have urls', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fixture, app, menuItems;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestBed.createComponent(AppComponent)];
                case 1:
                    fixture = _a.sent();
                    return [4 /*yield*/, fixture.detectChanges()];
                case 2:
                    _a.sent();
                    app = fixture.nativeElement;
                    menuItems = app.querySelectorAll('ion-item');
                    expect(menuItems.length).toEqual(1);
                    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/home');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have one router outlet', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fixture, app, routerOutlet;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestBed.createComponent(AppComponent)];
                case 1:
                    fixture = _a.sent();
                    return [4 /*yield*/, fixture.detectChanges()];
                case 2:
                    _a.sent();
                    app = fixture.nativeElement;
                    routerOutlet = app.querySelectorAll('ion-router-outlet');
                    expect(routerOutlet.length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have one menubar', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fixture, app, menubar;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestBed.createComponent(AppComponent)];
                case 1:
                    fixture = _a.sent();
                    return [4 /*yield*/, fixture.detectChanges()];
                case 2:
                    _a.sent();
                    app = fixture.nativeElement;
                    menubar = app.querySelectorAll('app-menubar');
                    expect(menubar.length).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=app.component.spec.js.map