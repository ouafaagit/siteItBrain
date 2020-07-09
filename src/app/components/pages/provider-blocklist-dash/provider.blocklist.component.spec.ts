import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ProviderBlocklistComponent} from "./provider.blocklist.component";


describe('ProviderBlocklistComponent', () => {
  let component: ProviderBlocklistComponent;
  let fixture: ComponentFixture<ProviderBlocklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderBlocklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderBlocklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
