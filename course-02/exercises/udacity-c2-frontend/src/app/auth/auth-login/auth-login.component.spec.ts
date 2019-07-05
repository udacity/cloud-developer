import {CUSTOM_ELEMENTS_SCHEMA, forwardRef} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthLoginComponent} from './auth-login.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularDelegate, IonicModule, ModalController} from '@ionic/angular';

describe('AuthLoginPage', () => {
    let component: AuthLoginComponent;
    let fixture: ComponentFixture<AuthLoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, HttpClientModule, IonicModule],
            declarations: [AuthLoginComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ModalController, AngularDelegate

            ]
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
});
