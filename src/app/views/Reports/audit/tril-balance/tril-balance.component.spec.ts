import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrilBalanceComponent } from './tril-balance.component';

describe('TrilBalanceComponent', () => {
  let component: TrilBalanceComponent;
  let fixture: ComponentFixture<TrilBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrilBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrilBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
