import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth.guard.service';
import { RouterTestingModule } from '@angular/router/testing';
describe('AuthGuardService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({
        imports: [RouterTestingModule]
    }); });
    it('should be created', function () {
        var service = TestBed.get(AuthGuardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=auth.guard.service.spec.js.map