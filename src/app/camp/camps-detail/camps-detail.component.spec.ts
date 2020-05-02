import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsDetailComponent } from './camps-detail.component';

describe('CampsDetailComponent', () => {
  let component: CampsDetailComponent;
  let fixture: ComponentFixture<CampsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
