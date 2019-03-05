import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControltestComponent } from './controltest.component';

describe('ControltestComponent', () => {
  let component: ControltestComponent;
  let fixture: ComponentFixture<ControltestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControltestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControltestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
