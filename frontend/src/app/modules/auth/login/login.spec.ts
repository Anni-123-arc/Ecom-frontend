import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid initially', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should show error for invalid email', () => {
    component.email?.setValue('invalid');
    component.email?.markAsTouched();
    fixture.detectChanges();

    expect(component.email?.invalid).toBeTrue();
    expect(component.email?.errors?.['email']).toBeTrue();
  });

  it('should show error for short password', () => {
    component.password?.setValue('123');
    component.password?.markAsTouched();
    fixture.detectChanges();

    expect(component.password?.invalid).toBeTrue();
    expect(component.password?.errors?.['minlength']).toBeTrue();
  });

  it('should navigate on valid submit', () => {
    spyOn(window, 'alert');
    spyOn(router, 'navigate');

    component.email?.setValue('test@example.com');
    component.password?.setValue('123456');
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Login successful!');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
