import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyOrdersPage } from './company-orders.page';

describe('CompanyOrdersPage', () => {
  let component: CompanyOrdersPage;
  let fixture: ComponentFixture<CompanyOrdersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
