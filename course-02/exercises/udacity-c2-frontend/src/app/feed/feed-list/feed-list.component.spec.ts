import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeedListComponent } from './feed-list.component';
import { FeedProviderService } from '../services/feed.provider.service';
import { feedItemMocks } from '../models/feed-item.model';

describe('FeedListComponent', () => {
  let component: FeedListComponent;
  let fixture: ComponentFixture<FeedListComponent>;
  let feedProvider: FeedProviderService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListComponent);

    // SET UP SPIES AND MOCKS
    feedProvider = fixture.debugElement.injector.get(FeedProviderService);
    // spyOn(feedProvider, 'fetch').and.returnValue(Promise.resolve(feedItemMocks));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch on load', () => {
    expect(feedProvider.getFeed).toHaveBeenCalled();
  });

  it('should display all of the fetched items', () => {
    component.feedItems = feedItemMocks;
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const items = app.querySelectorAll('app-feed-item');
    expect(items.length).toEqual(feedItemMocks.length);
  });
});
