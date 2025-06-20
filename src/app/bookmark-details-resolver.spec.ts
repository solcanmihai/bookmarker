import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { bookmarkDetailsResolver } from './bookmark-details-resolver';

describe('bookmarkDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => bookmarkDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
