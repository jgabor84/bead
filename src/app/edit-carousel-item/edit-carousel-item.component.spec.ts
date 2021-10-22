import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarouselItemComponent } from './edit-carousel-item.component';

describe('EditCarouselItemComponent', () => {
  let component: EditCarouselItemComponent;
  let fixture: ComponentFixture<EditCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarouselItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
