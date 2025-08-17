import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableMenuBar } from './scrollable-menu-bar';

describe('ScrollableMenuBar', () => {
  let component: ScrollableMenuBar;
  let fixture: ComponentFixture<ScrollableMenuBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollableMenuBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollableMenuBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
