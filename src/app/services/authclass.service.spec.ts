import { TestBed } from '@angular/core/testing';

import { AuthclassService } from './authclass.service';

describe('AuthclassService', () => {
  let service: AuthclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
