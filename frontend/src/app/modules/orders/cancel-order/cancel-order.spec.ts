import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrder } from './cancel-order';

describe('CancelOrder', () => {
  let component: CancelOrder;
  let fixture: ComponentFixture<CancelOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
