import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        role: ['user', [Validators.required, Validators.pattern(/^(user|admin)$/)]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get mobile() { return this.registerForm.get('mobile'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get role() { return this.registerForm.get('role'); }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value };
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'string') {
          formData[key] = formData[key].trim();
        }
      });

      this.authService.register(formData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Welcome to NextBuy! 🎉',
            html: `<strong>${formData.firstName} ${formData.lastName}</strong>, your account has been created successfully!<br><br>
                   <em>Login now to start shopping for your favorite products.</em>`,
            icon: 'success',
            confirmButtonText: 'Go to Login',
            confirmButtonColor: '#1976d2',
            background: '#f8fbff',
            color: '#0d47a1',
            timer: 3000,
            timerProgressBar: true
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Registration Failed',
            text: err.error?.message || 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Form Incomplete',
        text: 'Please fill in all required fields correctly.',
        icon: 'warning',
        confirmButtonColor: '#f6c23e'
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
