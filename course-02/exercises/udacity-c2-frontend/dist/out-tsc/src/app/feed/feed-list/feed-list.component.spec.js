import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FeedListComponent } from './feed-list.component';
import { FeedProviderService } from '../services/feed.provider.service';
import { feedItemMocks } from '../models/feed-item.model';
describe('FeedListComponent', function () {
    var component;
    var fixture;
    var feedProvider;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [FeedListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FeedListComponent);
        // SET UP SPIES AND MOCKS
        feedProvider = fixture.debugElement.injector.get(FeedProviderService);
        // spyOn(feedProvider, 'fetch').and.returnValue(Promise.resolve(feedItemMocks));
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should fetch on load', function () {
        expect(feedProvider.getFeed).toHaveBeenCalled();
    });
    it('should display all of the fetched items', function () {
        component.feedItems = feedItemMocks;
        fixture.detectChanges();
        var app = fixture.nativeElement;
        var items = app.querySelectorAll('app-feed-item');
        expect(items.length).toEqual(feedItemMocks.length);
    });
});
//# sourceMappingURL=feed-list.component.spec.js.map