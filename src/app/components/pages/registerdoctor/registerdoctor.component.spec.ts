import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RegisterdoctorComponent} from "./registerdoctor.component";


describe('RegisterdoctorComponent', () => {
  let component: RegisterdoctorComponent;
  let fixture: ComponentFixture<RegisterdoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterdoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
