import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../core/services/orderdata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancel-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './cancel-order.html',
  styleUrl: './cancel-order.css'
})
export class CancelOrderComponent implements OnInit {
  order: any;
  reasons = {
    mistake: false,
    lowerPrice: false,
    shipping: false,
    notneeded:false,
    changedmind:false,
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

  confirmCancel() {
    const selectedReasons = Object.keys(this.reasons)
      .filter(key => key !== 'otherReason' && this.reasons[key as keyof typeof this.reasons])
      .map(reason => reason === 'other' ? this.reasons.otherReason : reason);

    // You can also send imageFiles here to backend if needed

    this.orderService.updateOrderStatus(this.order.id, 'Cancelled', selectedReasons);
    alert('Order cancelled successfully!');

    // Clear images after confirmation
    this.imagePreviews = [];
    this.imageFiles = [];

    this.router.navigate(['/orders', this.order.id]);
  }
}
