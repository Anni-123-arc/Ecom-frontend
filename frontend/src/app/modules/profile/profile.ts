import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeHeader } from '../../shared/components/home-header/home-header';
import { Footer } from '../../shared/components/footer/footer';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HomeHeader, Footer],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  userData: any = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '9876543210',
    address1: '123 Main Street',
    address2: 'Apartment 4B',
    profileImageUrl: ''
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    // API call: fetch user profile
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userData = res.user;
      },
      error: (err) => alert(err.error.message || 'Error fetching profile')
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Preview image
    const reader = new FileReader();
    reader.onload = () => {
      this.userData.profileImageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    // TODO: Upload to backend API
    // this.userService.uploadProfileImage(file).subscribe(...)
  }

  navigateTo(path: string) {
    this.router.navigate([path], { state: { user: this.userData } });
  }

  updateProfile() {
    this.userService.updateProfile(this.userData).subscribe({
      next: () => alert('Profile updated!'),
      error: (err) => alert(err.error.message || 'Error updating profile')
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
