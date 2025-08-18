import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-cart-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderCartSummaryComponent {
  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  getTotalItems() {
    return this.cartService.cartItems.reduce((total, item) => 
      total + item.quantity, 0);
  }

  getOrderTotal() {
    const subtotal = this.cartService.getCartTotal();
    const tax = subtotal * 0.18; // Assuming 18% tax
    return subtotal + tax;
  }

  proceedToCheckout() {
    if (this.cartService.cartItemss.length > 0) {
      this.router.navigate(['/checkout']);
    } else {
      alert('Your cart is empty. Please add items to proceed to checkout.');
    }
  }
}