import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { navigationGuard } from './navigation.guard';

describe('navigationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => navigationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
