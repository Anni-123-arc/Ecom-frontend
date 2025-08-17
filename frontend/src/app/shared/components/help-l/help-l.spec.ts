import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpL } from './help-l';

describe('HelpL', () => {
  let component: HelpL;
  let fixture: ComponentFixture<HelpL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpL]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpL);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
