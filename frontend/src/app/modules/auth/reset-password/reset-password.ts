import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule , CommonModule],
  standalone: true,
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  message: string = '';
  loading: boolean = false;
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Pre-fill email if passed via query param
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.resetForm.patchValue({ email: params['email'] });
      }
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    const data = this.resetForm.value;

    this.loading = true;
    this.message = '';
    this.success = false;

    this.authService.resetPassword(data).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Password reset successfully!';
        this.success = true;
        this.loading = false;

        // Redirect after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Something went wrong. Try again later.';
        this.loading = false;
      }
    });
  }
}
