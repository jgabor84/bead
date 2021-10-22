import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineDiscountComponent } from './wine-discount.component';

describe('WineDiscountComponent', () => {
  let component: WineDiscountComponent;
  let fixture: ComponentFixture<WineDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
