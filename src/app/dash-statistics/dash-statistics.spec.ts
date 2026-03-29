import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashStatistics } from './dash-statistics';

describe('DashStatistics', () => {
  let component: DashStatistics;
  let fixture: ComponentFixture<DashStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashStatistics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashStatistics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
