import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPlanCreationComponent } from './bill-plan-creation.component';

describe('BillPlanCreationComponent', () => {
  let component: BillPlanCreationComponent;
  let fixture: ComponentFixture<BillPlanCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillPlanCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillPlanCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
