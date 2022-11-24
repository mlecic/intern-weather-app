import { TestBed } from '@angular/core/testing';

import { AirPolutionService } from './air-polution.service';

describe('AirPolutionService', () => {
  let service: AirPolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirPolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
