import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgrnWithoutPurchaseComponent } from './bgrn-without-purchase.component';

describe('BgrnWithoutPurchaseComponent', () => {
  let component: BgrnWithoutPurchaseComponent;
  let fixture: ComponentFixture<BgrnWithoutPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BgrnWithoutPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BgrnWithoutPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
