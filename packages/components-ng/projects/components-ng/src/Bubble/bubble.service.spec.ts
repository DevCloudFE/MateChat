import { TestBed } from '@angular/core/testing';

import { BubbleService } from './bubble.service';

describe('BubbleService', () => {
  let service: BubbleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BubbleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
