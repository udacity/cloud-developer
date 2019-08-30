import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthRegisterComponent} from './auth-register.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularDelegate, IonicModule, ModalController} from '@ionic/angular';

describe('AuthRegisterPage', () => {
    let component: AuthRegisterComponent;
    let fixture: ComponentFixture<AuthRegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, HttpClientModule, IonicModule],
            declarations: [AuthRegisterComponent],
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
    it('empty password is invalid', () => {
        component.registerForm.controls.password.setValue('');
        expect(component.registerForm.controls.password.invalid).toBeTruthy();
    });
    it('check is random password valid', () => {
        component.registerForm.controls.password.setValue('asdas');
        expect(component.registerForm.controls.password.valid).toBeTruthy();
    });
    it('check valid email', () => {
        component.registerForm.controls.email.setValue('test@test.com');
        expect(component.registerForm.controls.email.valid).toBeTruthy();
    });
    it('check invalid email', () => {
        component.registerForm.controls.email.setValue('rubbishstring');
        expect(component.registerForm.controls.email.invalid).toBeTruthy();
    });
    it('test a complete valid form', () => {
        const password = 'testpassword';
        component.registerForm.controls.email.setValue('test@test.com');
        component.registerForm.controls.name.setValue('test');
        component.registerForm.controls.password.setValue(password);
        component.registerForm.controls.password_confirm.setValue(password);
        expect(component.registerForm.valid).toBeTruthy();
    });
    it('should be invalid when password does not match', () => {
        component.registerForm.controls.email.setValue('test@test.com');
        component.registerForm.controls.name.setValue('test');
        component.registerForm.controls.password.setValue('testpassword');
        component.registerForm.controls.password_confirm.setValue('randomrubbish');
        expect(component.registerForm.invalid).toBeTruthy();
    });

});
