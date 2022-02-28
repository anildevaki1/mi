import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfgrComponent } from './mfgr.component';

describe('MfgrComponent', () => {
  let component: MfgrComponent;
  let fixture: ComponentFixture<MfgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfgrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
