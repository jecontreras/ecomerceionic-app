import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BottomTabsComponent } from './bottom-tabs.component';

describe('BottomTabsComponent', () => {
  let component: BottomTabsComponent;
  let fixture: ComponentFixture<BottomTabsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BottomTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
