import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address.html',
  styleUrls: ['./address.css']
})
export class Address implements OnInit {
  addresses: any[] = [
    // Static fallback/demo addresses
    { name: 'Home', line1: '123 Main Street', line2: 'Apt 4B', city: 'New York', state: 'NY', zip: '10001' },
    { name: 'Office', line1: '456 Business Rd', line2: 'Apt 6A', city: 'Los Angeles', state: 'CA', zip: '90001' }
  ];

  newAddress = { street: '', city: '', state: '', zip: '' };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAddresses();
  }

  loadAddresses() {
    // API call: Fetch addresses from backend
    this.userService.getAddresses().subscribe({
      next: (res) => {
        this.addresses = res;
      },
      error: () => {
        // Optionally handle error or keep static fallback addresses
      }
    });
  }

  addAddress() {
    // API call: Add new address to backend
    this.userService.addAddress(this.newAddress).subscribe({
      next: () => {
        alert('Address added');
        this.loadAddresses(); // Reload updated list
      },
      error: () => alert('Failed to add address')
    });
  }

  editAddress(index: number) {
    // For demo purposes: static alert, implement edit UI/API as needed
    alert(`Edit address #${index + 1}`);
  }

  deleteAddress(idOrIndex: string | number) {
    // API call: Delete address by id (string) or static delete by index (number)
    if (typeof idOrIndex === 'string') {
      this.userService.deleteAddress(idOrIndex).subscribe({
        next: () => {
          alert('Address deleted');
          this.loadAddresses(); // Reload updated list
        },
        error: () => alert('Failed to delete address')
      });
    } else if (typeof idOrIndex === 'number') {
      // Static deletion from local array (fallback/demo)
      this.addresses.splice(idOrIndex, 1);
    }
  }
}
