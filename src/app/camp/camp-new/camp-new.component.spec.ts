import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampNewComponent } from './camp-new.component';

describe('CampNewComponent', () => {
  let component: CampNewComponent;
  let fixture: ComponentFixture<CampNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
