import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PaginationComponent} from "../pagination/pagination.component";
import {ProviderNoblocklistComponent} from "./provider.noblocklist.component";



describe('ProviderNoblocklistComponent', () => {
  let component: ProviderNoblocklistComponent;
  let fixture: ComponentFixture<ProviderNoblocklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderNoblocklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderNoblocklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
