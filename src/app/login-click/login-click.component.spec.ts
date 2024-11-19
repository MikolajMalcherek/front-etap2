import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginClickComponent } from './login-click.component';

describe('LoginClickComponent', () => {
  let component: LoginClickComponent;
  let fixture: ComponentFixture<LoginClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginClickComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
