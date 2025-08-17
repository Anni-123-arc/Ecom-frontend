import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have form invalid initially', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should show required errors if fields are touched but empty', () => {
    component.name?.markAsTouched();
    component.email?.markAsTouched();
    component.password?.markAsTouched();
    component.confirmPassword?.markAsTouched();
    fixture.detectChanges();

    expect(component.name?.errors?.['required']).toBeTrue();
    expect(component.email?.errors?.['required']).toBeTrue();
    expect(component.password?.errors?.['required']).toBeTrue();
    expect(component.confirmPassword?.errors?.['required']).toBeTrue();
  });

  it('should show email format error for invalid email', () => {
    component.email?.setValue('invalid-email');
    component.email?.markAsTouched();
    fixture.detectChanges();

    expect(component.email?.errors?.['email']).toBeTrue();
  });

  it('should show minlength error for short password', () => {
    component.password?.setValue('123');
    component.password?.markAsTouched();
    fixture.detectChanges();

    expect(component.password?.errors?.['minlength']).toBeTruthy();
  });

  it('should show mismatch error if passwords do not match', () => {
    component.password?.setValue('password123');
    component.confirmPassword?.setValue('different123');
    fixture.detectChanges();

    expect(component.registerForm.errors?.['mismatch']).toBeTrue();
  });

  it('should not show mismatch error if passwords match', () => {
    component.password?.setValue('password123');
    component.confirmPassword?.setValue('password123');
    fixture.detectChanges();

    expect(component.registerForm.errors).toBeNull();
  });

  it('should enable submit button only when form is valid', () => {
    component.name?.setValue('Test User');
    component.email?.setValue('test@example.com');
    component.password?.setValue('password123');
    component.confirmPassword?.setValue('password123');
    fixture.detectChanges();

    expect(component.registerForm.valid).toBeTrue();
  });

  it('should show success alert and navigate to login on submit', () => {
    spyOn(window, 'alert');
    spyOn(router, 'navigate');

    component.name?.setValue('John Doe');
    component.email?.setValue('john@example.com');
    component.password?.setValue('pass1234');
    component.confirmPassword?.setValue('pass1234');
    fixture.detectChanges();

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Registration successful!');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
