import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWineComponent } from './get-wine.component';

describe('GetWineComponent', () => {
  let component: GetWineComponent;
  let fixture: ComponentFixture<GetWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
