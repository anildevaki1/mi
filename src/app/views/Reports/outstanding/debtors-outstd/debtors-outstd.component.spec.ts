import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtorsOutstdComponent } from './debtors-outstd.component';

describe('DebtorsOutstdComponent', () => {
  let component: DebtorsOutstdComponent;
  let fixture: ComponentFixture<DebtorsOutstdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtorsOutstdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtorsOutstdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
