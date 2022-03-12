import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcWithoutSalesInvoiceComponent } from './dc-without-sales-invoice.component';

describe('DcWithoutSalesInvoiceComponent', () => {
  let component: DcWithoutSalesInvoiceComponent;
  let fixture: ComponentFixture<DcWithoutSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcWithoutSalesInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcWithoutSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
