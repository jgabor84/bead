import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineTopRatingComponent } from './wine-top-rating.component';

describe('WineTopRatingComponent', () => {
  let component: WineTopRatingComponent;
  let fixture: ComponentFixture<WineTopRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineTopRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineTopRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
