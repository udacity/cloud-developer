import { TestBed } from '@angular/core/testing';

import { FeedProviderService } from './feed.provider.service';

describe('Feed.ProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedProviderService = TestBed.get(FeedProviderService);
    expect(service).toBeTruthy();
  });
});
