import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DetailProviderComponent} from "./detail-provider.component";



describe('DetailProviderComponent', () => {
  let component: DetailProviderComponent;
  let fixture: ComponentFixture<DetailProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
