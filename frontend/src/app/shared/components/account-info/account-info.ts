import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeHeader } from '../home-header/home-header';
import { Footer } from '../footer/footer';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [CommonModule, HomeHeader, Footer],
  templateUrl: './account-info.html',
  styleUrls: ['./account-info.css']
})
export class AccountInfoComponent implements OnInit {
  user: any = {};

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Fetch profile from backend instead of relying on navigation state
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res.user;
      },
      error: (err) => {
        console.error('Failed to fetch profile', err);
        this.router.navigate(['/login']); // Redirect if token is invalid
      }
    });
  }
}
