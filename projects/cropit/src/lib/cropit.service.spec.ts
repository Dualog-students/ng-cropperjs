import { TestBed } from '@angular/core/testing';

import { CropitService } from './cropit.service';

describe('CropitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CropitService = TestBed.get(CropitService);
    expect(service).toBeTruthy();
  });
});
