import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth.guard.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ]
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
