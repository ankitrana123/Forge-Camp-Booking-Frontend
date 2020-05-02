import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCampsComponent } from './all-camps.component';

describe('AllCampsComponent', () => {
  let component: AllCampsComponent;
  let fixture: ComponentFixture<AllCampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCampsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
