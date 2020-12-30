import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquorSummaryInfoComponent } from './liquor-summary-info.component';

describe('LiquorSummaryInfoComponent', () => {
  let component: LiquorSummaryInfoComponent;
  let fixture: ComponentFixture<LiquorSummaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquorSummaryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquorSummaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
