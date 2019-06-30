import { AuthMenuButtonComponent } from './auth-menu-button.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';


describe('AuthMenuButtonPage', () => {
  let component: AuthMenuButtonComponent;
  let fixture: ComponentFixture<AuthMenuButtonComponent>;
  let modalSpy;
  let modalCtrlSpy;
  beforeEach(async(() => {
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
      declarations: [ AuthMenuButtonComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
