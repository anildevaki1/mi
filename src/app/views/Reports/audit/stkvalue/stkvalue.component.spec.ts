import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StkvalueComponent } from './stkvalue.component';

describe('StkvalueComponent', () => {
  let component: StkvalueComponent;
  let fixture: ComponentFixture<StkvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StkvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StkvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
