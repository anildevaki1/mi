import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdcWithoutSalesInvoiceComponent } from './bdc-without-sales-invoice.component';

describe('BdcWithoutSalesInvoiceComponent', () => {
  let component: BdcWithoutSalesInvoiceComponent;
  let fixture: ComponentFixture<BdcWithoutSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdcWithoutSalesInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BdcWithoutSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
