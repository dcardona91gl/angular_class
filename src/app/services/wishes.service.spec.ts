import { TestBed } from '@angular/core/testing';

import { WishesService } from './wishes.service';

describe('WishesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WishesService = TestBed.get(WishesService);
    expect(service).toBeTruthy();
  });
});
