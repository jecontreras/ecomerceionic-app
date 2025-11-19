import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendorOrdesPage } from './vendor-orders.page';

describe('VendorOrdesPage', () => {
  let component: VendorOrdesPage;
  let fixture: ComponentFixture<VendorOrdesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrdesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
