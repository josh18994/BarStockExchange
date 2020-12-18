import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquorTileComponent } from './liquor-tile.component';

describe('LiquorTileComponent', () => {
  let component: LiquorTileComponent;
  let fixture: ComponentFixture<LiquorTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquorTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
