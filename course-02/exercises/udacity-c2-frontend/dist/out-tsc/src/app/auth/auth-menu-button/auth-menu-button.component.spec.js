import { AuthMenuButtonComponent } from './auth-menu-button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
describe('AuthMenuButtonPage', function () {
    var component;
    var fixture;
    var modalSpy;
    var modalCtrlSpy;
    beforeEach(async(function () {
        modalSpy = jasmine.createSpyObj('Modal', ['present']);
        modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);
        modalCtrlSpy.create.and.callFake(function () {
            return modalSpy;
        });
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ModalController,
                    useValue: modalCtrlSpy
                }
            ],
            declarations: [AuthMenuButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AuthMenuButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=auth-menu-button.component.spec.js.map