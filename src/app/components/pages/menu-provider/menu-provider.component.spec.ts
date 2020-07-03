import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProviderComponent } from './menu-provider.component';

describe('MenuProviderComponent', () => {
  let component: MenuProviderComponent;
  let fixture: ComponentFixture<MenuProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
