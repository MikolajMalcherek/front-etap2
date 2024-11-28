import { TestBed } from '@angular/core/testing';

import { ApprulService } from './apprul.service';

describe('ApprulService', () => {
  let service: ApprulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
