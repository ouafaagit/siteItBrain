import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {DetailSpecialityComponent} from "./detail-speciality.component";


describe('DetailSpecialityComponent', () => {
  let component: DetailSpecialityComponent;
  let fixture: ComponentFixture<DetailSpecialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSpecialityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
