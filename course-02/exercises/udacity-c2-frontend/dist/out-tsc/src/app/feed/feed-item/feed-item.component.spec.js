import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FeedItemComponent } from './feed-item.component';
import { feedItemMocks } from '../models/feed-item.model';
describe('FeedItemComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FeedItemComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FeedItemComponent);
        component = fixture.componentInstance;
        component.feedItem = feedItemMocks[0];
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should set the image url to the feedItem', function () {
        var app = fixture.nativeElement;
        var img = app.querySelectorAll('ion-img');
        expect(img.length).toEqual(1);
        expect(img[0].src).toEqual(feedItemMocks[0].url);
    });
    it('should display the caption', function () {
        var app = fixture.nativeElement;
        var paragraphs = app.querySelectorAll('p');
        expect(([].slice.call(paragraphs)).map(function (x) { return x.innerText; })).toContain(feedItemMocks[0].caption);
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
//# sourceMappingURL=feed-item.component.spec.js.map