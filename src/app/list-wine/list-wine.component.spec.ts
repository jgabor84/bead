import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWineComponent } from './list-wine.component';

describe('ListWineComponent', () => {
  let component: ListWineComponent;
  let fixture: ComponentFixture<ListWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
