import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedUploadButtonComponent } from './feed-upload-button.component';
import {IonicModule} from '@ionic/angular';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FeedUploadButtonPage', () => {
  let component: FeedUploadButtonComponent;
  let fixture: ComponentFixture<FeedUploadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedUploadButtonComponent ],
      imports: [IonicModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
