import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousal.html',
  styleUrl: './carousal.css',
})
export class Carousal {
  images = [
    { id: 1, url: '../../../../assets/carousel-images/flash-sale1.jpg', alt: 'carousel image 1' },
    { id: 2, url: '../../../../assets/carousel-images/flash-sale2.jpg', alt: 'carousel image 2' },
    { id: 3, url: '../../../../assets/carousel-images/flash-sale3.jpg', alt: 'carousel image 3' },
    { id: 4, url: '../../../../assets/carousel-images/flash-sale4.jpg', alt: 'carousel image 4' },
    { id: 5, url: '../../../../assets/carousel-images/flash-sale5.jpg', alt: 'carousel image 5' }
  ];

  currentId = 0;
  url: string = this.images[this.currentId].url;
  alt: string = this.images[this.currentId].alt;

  constructor() {
    // Auto-slide every 5 seconds
    setInterval(() => {
      this.nextSlide(1);
    }, 5000);
  }

  nextSlide(n: number): void {
    this.currentId = (this.currentId + n + this.images.length) % this.images.length;
    this.updateSlide();
  }

  currentSlide(index: number): void {
    this.currentId = index;
    this.updateSlide();
  }

  private updateSlide(): void {
    this.url = this.images[this.currentId].url;
    this.alt = this.images[this.currentId].alt;
  }
}
