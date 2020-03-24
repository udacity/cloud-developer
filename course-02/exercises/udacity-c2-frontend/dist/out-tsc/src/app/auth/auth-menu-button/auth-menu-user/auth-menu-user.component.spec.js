import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { AuthMenuUserComponent } from './auth-menu-user.component';
import { ModalController } from '@ionic/angular';
describe('AuthMenuUserPage', function () {
    var component;
    var fixture;
    var modalSpy;
    var modalCtrlSpy;
    beforeEach(async(function () {
        modalSpy = jasmine.createSpyObj('Modal', ['dismiss']);
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
            declarations: [AuthMenuUserComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AuthMenuUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    // it('#dismiss() should hide the modal', () => {
    //     .........
    //     expect(modalSpy.dismiss).toHaveBeenCalled(); 
    //     .........
    // });
});
//# sourceMappingURL=auth-menu-user.component.spec.js.map