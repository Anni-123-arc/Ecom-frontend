import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeHeader } from '../home-header/home-header';
import { Footer } from '../footer/footer';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule, FormsModule, HomeHeader, Footer],
  templateUrl: './bio.html',
  styleUrls: ['./bio.css']
})
export class Bio implements OnInit {
  editableUser: any = {};

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // ✅ Always fetch latest profile from backend
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.editableUser = { ...res.user };
      },
      error: (err) => {
        console.error('Failed to fetch profile', err);
        this.router.navigate(['/login']); // Redirect if not logged in
      }
    });
  }

  saveChanges() {
    this.userService.updateProfile(this.editableUser).subscribe({
      next: () => {
        if (this.editableUser.address1 || this.editableUser.address2) {
          const addressData = {
            name: 'Home',
            line1: this.editableUser.address1,
            line2: this.editableUser.address2,
            city: this.editableUser.city || '',
            state: this.editableUser.state || '',
            zip: this.editableUser.zip || ''
          };
          this.userService.addAddress(addressData).subscribe();
        }
        alert('Profile updated successfully!');
        this.router.navigate(['/account-info']);
      },
      error: () => alert('Failed to update profile')
    });
  }
}
