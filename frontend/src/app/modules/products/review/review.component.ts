
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../core/services/product.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent {
  @Input() reviews: Review[] = [];

  // Helper to generate an array for full and empty stars
  getStarsArray(rating: number): { full: boolean }[] {
    return Array.from({ length: 5 }, (_, index) => ({
      full: index < rating
    }));
  }
}
