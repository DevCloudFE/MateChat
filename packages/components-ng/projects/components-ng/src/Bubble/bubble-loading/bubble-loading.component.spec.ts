import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleLoadingComponent } from './bubble-loading.component';

describe('BubbleLoadingComponent', () => {
  let component: BubbleLoadingComponent;
  let fixture: ComponentFixture<BubbleLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BubbleLoadingComponent]
    });
    fixture = TestBed.createComponent(BubbleLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});