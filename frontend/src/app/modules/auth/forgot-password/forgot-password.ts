import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {
  forgotForm!: FormGroup;
  message: string = '';
  loading: boolean = false;
  success: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.loading = true;
    this.message = '';
    this.success = false;

    const email = this.forgotForm.value.email || '';

    this.authService.forgotPassword(email).subscribe({
      next: (res: any) => {
        this.message = res.message || 'If an account exists, you will receive an OTP.';
        this.success = true; //  show success box
        this.loading = false;

        // Redirect to reset-password after 2s
        setTimeout(() => {
          this.router.navigate(['/reset-password'], { queryParams: { email } });
        }, 2000);
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Something went wrong. Try again later.';
        this.success = false;
        this.loading = false;
      }
    });
  }
}
