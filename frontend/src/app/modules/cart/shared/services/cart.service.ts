// cart.service.ts
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, ProductService } from '../../../../core/services/product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{
  private _cartItems = new BehaviorSubject<any[]>([]);
  private _wishlistItems = new BehaviorSubject<any[]>([
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: 1999,
      originalPrice: 2999,
      image: '../../../../../assets/cart/demo-earbuds.webp',
      deliveryDate: 'Mon, Jun 10'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 3499,
      originalPrice: 4999,
      image: '../../../../../assets/cart/demo-watch.webp',
      deliveryDate: 'Wed, Jun 12'
    }
  ]);
  cartItemss: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.addToCartItems()
      
  }

  addToCartItems(){
      this.cartItemss= this.productService.returnCartItems();
      console.log("Cart Items: ", this.cartItemss);
      return this.cartItemss
  }

  // Expose as public observables
  cartItems$ = this._cartItems.asObservable();
  wishlistItems$ = this._wishlistItems.asObservable();

  // Add to cart
  addToCart(item: any) {
    const currentItems = this._cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ ...item, quantity: 1 });
    }
    
    this._cartItems.next([...currentItems]);
  }

  // remove from cart
  removeFromCart(itemId: number) {
  const updatedItems = this.cartItemss.filter(item => item.id !== itemId);
  this.cartItemss = updatedItems;
  console.log("-----------><" , this.cartItemss)

  }

  // Move from wishlist to cart
  moveToCart(item: any) {
    this.addToCart(item);
    this.removeFromWishlist(item.id);
  }

  // Wishlist operations
  addToWishlist(item: any) {
    const currentItems = this._wishlistItems.value;
    if (!currentItems.find(i => i.id === item.id)) {
      this._wishlistItems.next([...currentItems, item]);
    }
  }

  removeFromWishlist(itemId: number) {
    const updatedItems = this._wishlistItems.value.filter(item => item.id !== itemId);
    this._wishlistItems.next(updatedItems);
  }

   // Helper to get current value
  get cartItems() {
    return this._cartItems.value;
  }
  
  // Calculate total
  getCartTotal() {
    return this.cartItemss.reduce((total, item) => 
      total + (item.price * item.quantity), 0);
  }

  // In cart.service.ts
updateQuantity(itemId: number, change: number) {
  const items = this.cartItemss;
  const itemIndex = items.findIndex(item => item.id === itemId);
  
  if (itemIndex > -1) {
    const newQuantity = items[itemIndex].quantity + change;
    
    if (newQuantity > 0) {
      items[itemIndex].quantity = newQuantity;
    } else {
      // Remove if quantity would go to 0 or below
      items.splice(itemIndex, 1);
    }
    
    this.cartItemss = items
    console.log("Updated Cart Items: ", this.cartItemss);
  }
}
}