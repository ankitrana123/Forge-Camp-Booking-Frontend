import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcampComponent } from './bookcamp.component';

describe('BookcampComponent', () => {
  let component: BookcampComponent;
  let fixture: ComponentFixture<BookcampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
