import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesAndServicesComponent } from './facilities-and-services.component';

describe('FacilitiesAndServicesComponent', () => {
  let component: FacilitiesAndServicesComponent;
  let fixture: ComponentFixture<FacilitiesAndServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesAndServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesAndServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
