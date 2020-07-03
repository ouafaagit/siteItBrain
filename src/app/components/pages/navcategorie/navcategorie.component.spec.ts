import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcategorieComponent } from './navcategorie.component';

describe('NavcategorieComponent', () => {
  let component: NavcategorieComponent;
  let fixture: ComponentFixture<NavcategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavcategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
