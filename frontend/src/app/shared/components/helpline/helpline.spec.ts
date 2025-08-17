import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Helpline } from './helpline';

describe('Helpline', () => {
  let component: Helpline;
  let fixture: ComponentFixture<Helpline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Helpline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Helpline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
