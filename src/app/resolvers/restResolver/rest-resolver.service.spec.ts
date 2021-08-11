import { TestBed } from '@angular/core/testing';

import { RestResolverService } from './rest-resolver.service';

describe('RestResolverService', () => {
  let service: RestResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
