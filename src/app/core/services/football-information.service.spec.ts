import { TestBed } from '@angular/core/testing';

import { FootballInformationService } from './football-information.service';

describe('FootballInformationService', () => {
  let service: FootballInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
