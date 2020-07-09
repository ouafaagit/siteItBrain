import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ProviderNewlistComponent} from "./provider.newlist.component";


describe('ProviderNewlistComponent', () => {
  let component: ProviderNewlistComponent;
  let fixture: ComponentFixture<ProviderNewlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderNewlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderNewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
