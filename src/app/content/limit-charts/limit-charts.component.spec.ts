import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitChartsComponent } from './limit-charts.component';

describe('LimitChartsComponent', () => {
  let component: LimitChartsComponent;
  let fixture: ComponentFixture<LimitChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
