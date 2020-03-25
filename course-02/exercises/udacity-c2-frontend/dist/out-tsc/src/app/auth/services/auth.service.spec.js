import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
describe('AuthService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=auth.service.spec.js.map