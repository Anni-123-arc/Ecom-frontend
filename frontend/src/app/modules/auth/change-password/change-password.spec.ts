import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['changePassword', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, ChangePasswordComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid initially', () => {
    expect(component.changePasswordForm.valid).toBeFalse();
  });

  it('should set message if passwords do not match', () => {
    component.changePasswordForm.setValue({
      currentPassword: 'oldpass',
      newPassword: 'password123',
      confirmPassword: 'different'
    });

    component.onSubmit();

    expect(component.message).toBe('New password and confirm password do not match.');
    expect(authServiceSpy.changePassword).not.toHaveBeenCalled();
  });

  it('should call AuthService.changePassword and handle success', fakeAsync(() => {
    authServiceSpy.changePassword.and.returnValue(of({ message: 'Password changed successfully.' }));

    component.changePasswordForm.setValue({
      currentPassword: 'oldpass',
      newPassword: 'newpass123',
      confirmPassword: 'newpass123'
    });

    component.onSubmit();

    expect(component.loading).toBeTrue();
    expect(authServiceSpy.changePassword).toHaveBeenCalledWith({
      currentPassword: 'oldpass',
      newPassword: 'newpass123'
    });

    // Simulate async complete
    expect(component.success).toBeTrue();
    expect(component.message).toBe('Password changed successfully.');
    tick(1500);
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'], {
      queryParams: { message: 'Password changed successfully. Please log in again.' }
    });
  }));

  it('should handle error from AuthService.changePassword', () => {
    authServiceSpy.changePassword.and.returnValue(
      throwError(() => ({ error: { message: 'Server error' } }))
    );

    component.changePasswordForm.setValue({
      currentPassword: 'oldpass',
      newPassword: 'newpass123',
      confirmPassword: 'newpass123'
    });

    component.onSubmit();

    expect(component.loading).toBeFalse();
    expect(component.message).toBe('Server error');
    expect(component.success).toBeFalse();
  });
});
