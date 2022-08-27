import { TestBed } from '@angular/core/testing';

import { ConsultasEncadenadasService } from './consultas-encadenadas.service';

describe('ConsultasEncadenadasService', () => {
  let service: ConsultasEncadenadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasEncadenadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
