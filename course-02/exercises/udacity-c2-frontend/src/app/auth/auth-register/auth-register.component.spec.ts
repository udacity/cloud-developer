import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRegisterComponent } from './auth-register.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularDelegate, IonicModule, ModalController} from '@ionic/angular';

describe('AuthRegisterPage', () => {
  let component: AuthRegisterComponent;
  let fixture: ComponentFixture<AuthRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule , HttpClientModule, IonicModule],
      declarations: [ AuthRegisterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [ModalController, AngularDelegate]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
