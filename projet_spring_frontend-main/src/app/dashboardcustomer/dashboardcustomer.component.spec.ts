import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCustomerComponent } from './dashboardcustomer.component';

describe('DashboardCustomerComponent', () => {
  let component: DashboardCustomerComponent;
  let fixture: ComponentFixture<DashboardCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCustomerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
