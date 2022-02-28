import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradinganiComponent } from './tradingani.component';

describe('TradinganiComponent', () => {
  let component: TradinganiComponent;
  let fixture: ComponentFixture<TradinganiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradinganiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradinganiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
