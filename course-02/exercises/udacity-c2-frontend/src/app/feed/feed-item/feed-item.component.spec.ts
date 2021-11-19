import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedItemComponent } from './feed-item.component';
import { feedItemMocks } from '../models/feed-item.model';
import { FeedProviderService } from '../services/feed.provider.service';

describe('FeedItemComponent', () => {
  let component: FeedItemComponent;
  let fixture: ComponentFixture<FeedItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemComponent);
    component = fixture.componentInstance;
    component.feedItem = feedItemMocks[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the image url to the feedItem', () => {
    const app = fixture.nativeElement;
    const img = app.querySelectorAll('ion-img');
    expect(img.length).toEqual(1);
    expect(img[0].src).toEqual(feedItemMocks[0].url);
  });

  it('should display the caption', () => {
    const app = fixture.nativeElement;
    const paragraphs = app.querySelectorAll('p');
    expect(([].slice.call(paragraphs)).map((x) => x.innerText)).toContain(feedItemMocks[0].caption);
  });

  // it('should open a modal when clicked', () => {
  //   de = fixture.debugElement.query(By.css('ion-buttons button'));
  //   de.triggerEventHandler('click', null);
  //   expect(navCtrl.push).toHaveBeenCalledWith(WishlistPage);
  // });

  // it('should open a modal when clicked', () => {
  //   let navCtrl = fixture.debugElement.injector.get(NavController);
  //   spyOn(navCtrl, 'push');
  //   de = fixture.debugElement.query(By.css('ion-buttons button'));
  //   de.triggerEventHandler('click', null);
  //   expect(navCtrl.push).toHaveBeenCalledWith(WishlistPage);
  // });
});
