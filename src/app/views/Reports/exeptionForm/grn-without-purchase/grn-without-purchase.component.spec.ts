import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnWithoutPurchaseComponent } from './grn-without-purchase.component';

describe('GrnWithoutPurchaseComponent', () => {
  let component: GrnWithoutPurchaseComponent;
  let fixture: ComponentFixture<GrnWithoutPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnWithoutPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnWithoutPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
