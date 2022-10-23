import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCreationComponent } from './bill-creation.component';

describe('BillCreationComponent', () => {
  let component: BillCreationComponent;
  let fixture: ComponentFixture<BillCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
