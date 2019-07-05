import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedUploadButtonComponent} from './feed-upload-button.component';
import {AngularDelegate, ModalController} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';

describe('FeedUploadButtonPage', () => {
    let component: FeedUploadButtonComponent;
    let fixture: ComponentFixture<FeedUploadButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [FeedUploadButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ModalController, AngularDelegate]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedUploadButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
