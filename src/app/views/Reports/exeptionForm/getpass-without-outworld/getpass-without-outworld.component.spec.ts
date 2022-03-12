import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetpassWithoutOutworldComponent } from './getpass-without-outworld.component';

describe('GetpassWithoutOutworldComponent', () => {
  let component: GetpassWithoutOutworldComponent;
  let fixture: ComponentFixture<GetpassWithoutOutworldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetpassWithoutOutworldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetpassWithoutOutworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
