import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashComponent } from './menu-dash.component';

describe('MenuDashComponent', () => {
  let component: MenuDashComponent;
  let fixture: ComponentFixture<MenuDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
