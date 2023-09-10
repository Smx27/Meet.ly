import { TestBed } from '@angular/core/testing';

import { MemberEditDeactivateGuard } from './member-edit-deactivate.guard';

describe('MemberEditDeactivateGuard', () => {
  let guard: MemberEditDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MemberEditDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
