import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDeletionComponent } from './category-deletion.component';

describe('CategoryDeletionComponent', () => {
  let component: CategoryDeletionComponent;
  let fixture: ComponentFixture<CategoryDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDeletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
