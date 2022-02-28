import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditorsOutstdComponent } from './creditors-outstd.component';

describe('CreditorsOutstdComponent', () => {
  let component: CreditorsOutstdComponent;
  let fixture: ComponentFixture<CreditorsOutstdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditorsOutstdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditorsOutstdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
