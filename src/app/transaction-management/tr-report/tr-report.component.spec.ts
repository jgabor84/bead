import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrReportComponent } from './tr-report.component';

describe('TrReportComponent', () => {
  let component: TrReportComponent;
  let fixture: ComponentFixture<TrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
