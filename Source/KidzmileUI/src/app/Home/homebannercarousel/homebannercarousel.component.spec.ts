import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebannercarouselComponent } from './homebannercarousel.component';

describe('HomebannercarouselComponent', () => {
  let component: HomebannercarouselComponent;
  let fixture: ComponentFixture<HomebannercarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebannercarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebannercarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
