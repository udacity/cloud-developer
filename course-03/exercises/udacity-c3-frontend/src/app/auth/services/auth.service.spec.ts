import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule, HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
