import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistItemComponent } from '../../components/wishlist-item/wishlist-item.component';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Footer } from '../../../../shared/components/footer/footer';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, WishlistItemComponent, NavbarComponent, Footer],
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent {
  wishlistItems: any[] = [];

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    // Initialize with service data
    this.cartService.wishlistItems$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  handleRemove(itemId: number) {
    this.cartService.removeFromWishlist(itemId);
  }

  handleMoveToCart(item: any) {
    this.cartService.moveToCart(item);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToProducts() {
  this.router.navigate(['/products']); // or ['/products'] depending on your route
}
}