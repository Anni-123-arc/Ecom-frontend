import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../core/services/orderdata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeHeader } from '../../../shared/components/home-header/home-header';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-return-order',
  imports: [CommonModule, FormsModule, HomeHeader, Footer],
  templateUrl: './return-order.html',
  styleUrl: './return-order.css'
})
export class ReturnOrderComponent implements OnInit {
  order: any;
  reasons = {
    damaged: false,
    wrongItem: false,
    notNeeded: false,
    duplicateorder: false,
    poorquality:false,
    other: false,
    otherReason: ''
  };

  imagePreviews: string[] = [];
  imageFiles: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.order = this.orderService.getOrderById(orderId!);
  }

  onImagesSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.imageFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    event.target.value = '';
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }

  confirmReturn() {
    const selectedReasons = Object.keys(this.reasons)
      .filter(key => key !== 'otherReason' && this.reasons[key as keyof typeof this.reasons])
      .map(reason => reason === 'other' ? this.reasons.otherReason : reason);

    // Here you can send the images + reasons to backend if needed
    // For now, just updating order status and showing alert

    this.orderService.updateOrderStatus(this.order.id, 'Returned', selectedReasons);
    alert('Order returned successfully!');

    // Reset images after return
    this.imagePreviews = [];
    this.imageFiles = [];

    this.router.navigate(['/orders', this.order.id]);
  }
}
