import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderGlobalComponent } from './header-global.component';

describe('HeaderGlobalComponent', () => {
  let component: HeaderGlobalComponent;
  let fixture: ComponentFixture<HeaderGlobalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HeaderGlobalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
