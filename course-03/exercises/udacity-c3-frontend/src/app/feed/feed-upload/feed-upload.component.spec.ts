import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedUploadComponent } from './feed-upload.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {IonicModule} from '@ionic/angular';

describe('FeedUploadPage', () => {
  let component: FeedUploadComponent;
  let fixture: ComponentFixture<FeedUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedUploadComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
});
