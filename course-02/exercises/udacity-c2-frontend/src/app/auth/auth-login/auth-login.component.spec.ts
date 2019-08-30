import {CUSTOM_ELEMENTS_SCHEMA, forwardRef} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthLoginComponent} from './auth-login.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularDelegate, IonicModule, ModalController} from '@ionic/angular';

const VALID_EMAIL = 'test@test.com';

describe('AuthLoginPage', () => {
    let component: AuthLoginComponent;
    let fixture: ComponentFixture<AuthLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, IonicModule],
            declarations: [AuthLoginComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ModalController, AngularDelegate]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('empty password is invalid', () => {
        component.loginForm.controls.password.setValue('');
        expect(component.loginForm.controls.password.invalid).toBeTruthy();
    });
    it('check is random password valid', () => {
        component.loginForm.controls.password.setValue('asdas');
        expect(component.loginForm.controls.password.valid).toBeTruthy();
    });
    it('check valid email', () => {
        component.loginForm.controls.email.setValue('test@test.com');
        expect(component.loginForm.controls.email.valid).toBeTruthy();
    });
    it('check invalid email', () => {
        component.loginForm.controls.email.setValue('rubbishstring');
        expect(component.loginForm.controls.email.invalid).toBeTruthy();
    });

});
