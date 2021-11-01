import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrCashComponent } from './tr-cash.component';

describe('TrCashComponent', () => {
  let component: TrCashComponent;
  let fixture: ComponentFixture<TrCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
