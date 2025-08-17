import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, role } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);

          // 🎨 SweetAlert2 styled popup
          Swal.fire({
            title: 'Welcome to NextBuy! 🎉',
            html: `<strong>${email}</strong> logged in successfully as <strong>${role}</strong>.<br>Start shopping for your favorite products today!`,
            icon: 'success',
            confirmButtonText: 'Start Shopping',
            confirmButtonColor: '#1976d2',
            background: '#f8fbff',
            color: '#0d47a1',
            timer: 2500,
            timerProgressBar: true
          }).then(() => {
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Login Failed',
            text: err.error?.message || 'Something went wrong',
            icon: 'error',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
