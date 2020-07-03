import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityProductsComponent } from './speciality-products.component';

describe('AboutComponent', () => {
  let component: SpecialityProductsComponent;
  let fixture: ComponentFixture<SpecialityProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
