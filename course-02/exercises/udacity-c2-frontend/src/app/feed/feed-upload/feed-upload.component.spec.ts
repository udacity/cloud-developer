import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedUploadComponent} from './feed-upload.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularDelegate, IonicModule, ModalController} from '@ionic/angular';

describe('FeedUploadPage', () => {
    let component: FeedUploadComponent;
    let fixture: ComponentFixture<FeedUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, HttpClientModule, FormsModule, IonicModule],
            declarations: [FeedUploadComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ModalController, AngularDelegate]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be valid when caption is set', () => {
        component.uploadForm.controls.caption.setValue('test');
        expect(component.uploadForm.valid).toBeTruthy();
    });
});
