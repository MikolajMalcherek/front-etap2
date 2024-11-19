import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadLoginComponent } from './bad-login.component';

describe('BadLoginComponent', () => {
  let component: BadLoginComponent;
  let fixture: ComponentFixture<BadLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
