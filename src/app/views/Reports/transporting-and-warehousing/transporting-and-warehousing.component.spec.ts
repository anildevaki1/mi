import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportingAndWarehousingComponent } from './transporting-and-warehousing.component';

describe('TransportingAndWarehousingComponent', () => {
  let component: TransportingAndWarehousingComponent;
  let fixture: ComponentFixture<TransportingAndWarehousingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportingAndWarehousingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportingAndWarehousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
