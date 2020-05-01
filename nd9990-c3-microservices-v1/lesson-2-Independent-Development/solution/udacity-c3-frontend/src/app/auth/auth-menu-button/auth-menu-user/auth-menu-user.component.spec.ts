import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthMenuUserComponent } from './auth-menu-user.component';
import { ModalController } from '@ionic/angular';

describe('AuthMenuUserPage', () => {
  let component: AuthMenuUserComponent;
  let fixture: ComponentFixture<AuthMenuUserComponent>;
  let modalSpy;
  let modalCtrlSpy;

  beforeEach(async(() => {
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
      declarations: [ AuthMenuUserComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('#dismiss() should hide the modal', () => {
  //     .........
  //     expect(modalSpy.dismiss).toHaveBeenCalled(); 
  //     .........
  // });
});
