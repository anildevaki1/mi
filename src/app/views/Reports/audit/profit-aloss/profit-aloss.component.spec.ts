import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitALossComponent } from './profit-aloss.component';

describe('ProfitALossComponent', () => {
  let component: ProfitALossComponent;
  let fixture: ComponentFixture<ProfitALossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitALossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitALossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
