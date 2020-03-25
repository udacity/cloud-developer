import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MenubarComponent } from './menubar.component';
import { environment } from '../../environments/environment';
describe('MenubarPage', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MenubarComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MenubarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('title should be enviornment.AppTitle', function () {
        var app = fixture.nativeElement;
        var title = app.querySelectorAll('ion-title');
        expect(title.length).toEqual(1);
        expect(title[0].innerText).toEqual(environment.appName);
    });
});
//# sourceMappingURL=menubar.component.spec.js.map