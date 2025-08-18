import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { ProductService, Product } from '../../../core/services/product.service'; 
import { ReviewComponent } from '../review/review.component'; 
//import { HttpClientModule } from '@angular/common/http';
import { HomeHeader } from '../../../shared/components/home-header/home-header';
import { Footer } from '../../../shared/components/footer/footer';
import { AddToCartService } from '../../../core/services/add-to-cart-service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, HomeHeader, Footer, RouterModule, ReviewComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  //productId: string | null = null;
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private router: Router
  ) {}

  //product: any;
  ngOnInit(): void {

    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: Product | undefined) => {
        this.product = data;    // Fetch correct product
      });
    }
  }
  
  addToCart() {
    if (this.product) {
      // Here you could store the product in a CartService or localStorage
      // console.log('Buying now:', this.product);
      this.productService.addToCart(this.product); // Call the service to add to cart 
      this.router.navigate(['/cart']); // Navigate to cart page
    }
  }

  wishlist() {
    if (this.product) {
      // Optional: Add to cart before redirecting
      console.log('Product added to wishlist:', this.product);
      this.router.navigate(['/wishlist']); // Navigate to cart page directly
    }
  }
  goBack() {
    this.router.navigate(['/products']); // Navigate back to products list
  }
}