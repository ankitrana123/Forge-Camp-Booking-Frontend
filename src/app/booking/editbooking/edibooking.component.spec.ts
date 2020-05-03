import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdibookingComponent } from './edibooking.component';

describe('EdibookingComponent', () => {
  let component: EdibookingComponent;
  let fixture: ComponentFixture<EdibookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdibookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdibookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
