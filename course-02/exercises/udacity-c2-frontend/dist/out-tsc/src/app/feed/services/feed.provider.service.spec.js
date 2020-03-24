import { TestBed } from '@angular/core/testing';
import { FeedProviderService } from './feed.provider.service';
describe('Feed.ProviderService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(FeedProviderService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=feed.provider.service.spec.js.map