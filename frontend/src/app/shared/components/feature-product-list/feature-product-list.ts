import { Component, signal } from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature-product-list',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './feature-product-list.html',
  styleUrl: './feature-product-list.css'
})
export class FeatureProductList {
  product_details = signal([
    {
      id: 1,
      url: '../../../../assets/feature-item/-original-imagb54tb6fpurze.webp',
      alt: 'product img',
      productName: 'Premium Apple Watch',
      price: 1000,
      rating: 4.5,
      discount: '50%',
      discountPrice: 500


    },
    {
      id: 2,
      url: '../../../../assets/feature-item/-original-imah7rn68zxjzbqx.webp',
      alt: 'product img',
      productName: '50 Inch Samsung Monitor',
      price: 40000,
      rating: 5,
      discount: '50%',
      discountPrice: 20000
    },
    {
      id: 3,
      url: '../../../../assets/feature-item/print-barcode-labels-mini-portable-printer-with-usb-cable-original-imahd7ac8s3znfqe.webp',
      alt: 'product img',
      productName: 'Old School Sony Camera',
      price: 20000,
      rating: 4.5,
      discount: '50%',
      discountPrice: 10000
    },
    {
      id: 4,
      url: '../../../../assets/feature-item/srs-xb23-sony-original-imaftk66vjxp86h5.webp',
      alt: 'product img',
      productName: 'JBL Speakers',
      price: 2000,
      rating: 4,
      discount: '50%',
      discountPrice: 1000
    }
  ]);

  constructor(private router: Router) { }


  onClick() {
    this.router.navigate(['/products'])
  }
}
