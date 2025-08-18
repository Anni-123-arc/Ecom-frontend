import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { OrderCartSummaryComponent } from '../../components/order-summary/order-summary.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Footer } from '../../../../shared/components/footer/footer';
import { Router } from '@angular/router';
import { Product } from '../../../../core/services/product.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    Footer,
    OrderCartSummaryComponent  // Removed CartItemComponent since we're not using it
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart :Product[] = [];
  constructor(
    public cartService: CartService,
    private router: Router
  ) {
    console.log("----------<>",cartService.addToCartItems())
  }

  ngOnInit(): void {
      this.getItems();
  }

  getItems(){
    this.cart = this.cartService.addToCartItems();
   
    console.log("------<" , this.cart)
  }

  handleRemove(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  handleQuantityUpdate(event: {id: number, change: number}) {
    this.cartService.updateQuantity(event.id, event.change);
  }

  getTotalItems() {
    return this.cartService.cartItems.reduce((total, item) => 
      total + item.quantity, 0);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}