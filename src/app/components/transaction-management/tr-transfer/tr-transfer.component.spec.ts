import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrTransferComponent } from './tr-transfer.component';

describe('TrTransferComponent', () => {
  let component: TrTransferComponent;
  let fixture: ComponentFixture<TrTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
