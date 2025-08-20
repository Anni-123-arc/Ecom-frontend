import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav',
  imports: [],
  templateUrl: './admin-nav.html',
  styleUrl: './admin-nav.css'
})
export class AdminNav {
  isSyncing = false
  lastSyncTime = ' time'

  constructor(private router: Router) {
    const lastSync = localStorage.getItem('lastSyncTime');
    if (lastSync) {
      this.lastSyncTime = lastSync;
    }
  }

  syncData() {
    this.isSyncing = true;
    const now = new Date().toLocaleTimeString();
    this.lastSyncTime = now;

    // Save before reload
    localStorage.setItem('lastSyncTime', now);
    window.location.reload();

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  navigateToHome(){
    this.router.navigate(['/home']);
  }
}
