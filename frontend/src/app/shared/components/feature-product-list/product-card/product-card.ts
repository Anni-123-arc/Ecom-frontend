import { Component, input, signal } from '@angular/core';
import { OnInit } from '@angular/core';
type product = {
  id: number;
  url: string;
  alt: string;
  productName: string;
  price: number;
  rating: number;
  discount: string;
  discountPrice: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard implements OnInit {
  image_items = input<product>();

  stars: string[] = []; // Will store "full", "half", or "empty"

  ngOnInit() {
    let rating = this.image_items()?.rating||4.5;
    let tempRating = rating;

    // Add full and half stars using while loop
    while (tempRating > 0) {
      if (tempRating === 0.5) {
        this.stars.push('half');
        tempRating = 0;
      } else if (tempRating >= 1) {
        this.stars.push('full');
        tempRating--;
      }
    }

    // Fill the rest with empty stars up to 5 total
    while (this.stars.length < 5) {
      this.stars.push('empty');
    }
  }

}
