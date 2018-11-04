import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptycartcomponentComponent } from './emptycartcomponent.component';

describe('EmptycartcomponentComponent', () => {
  let component: EmptycartcomponentComponent;
  let fixture: ComponentFixture<EmptycartcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptycartcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptycartcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
