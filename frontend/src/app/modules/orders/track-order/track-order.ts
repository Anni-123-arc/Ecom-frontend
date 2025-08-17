import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/orderdata.service';
import { HomeHeader } from '../../../shared/components/home-header/home-header';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule,HomeHeader,Footer],
  templateUrl: './track-order.html',
  styleUrls: ['./track-order.css']
})
export class TrackOrder implements OnInit {
  orderId!: string;
  order: any = null;
  orderSteps: { status: string; date: string }[] = [];
  error: string | null = null;
  animatedStepIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    this.loadOrder();
  }

  loadOrder() {
    this.order = this.orderService.getOrderById(this.orderId);

    if (!this.order) {
      this.error = 'Order not found.';
      return;
    }

    this.buildTrackingSteps();
    this.animateTimeline();
  }

  buildTrackingSteps() {
    const steps: { status: string; date: string }[] = [];

    if (this.order.placedDate)
      steps.push({ status: 'Order Placed', date: this.order.placedDate });

    if (['Shipped', 'Delivered', 'Returned', 'Cancelled'].includes(this.order.status))
      steps.push({ status: 'Shipped', date: this.order.placedDate });

    if (['Delivered', 'Returned'].includes(this.order.status) && this.order.deliveredDate)
      steps.push({ status: 'Delivered', date: this.order.deliveredDate });

    if (this.order.status === 'Returned') {
      steps.push({ status: 'Return Initiated', date: this.order.deliveredDate });
      steps.push({ status: 'Returned', date: this.order.deliveredDate });
    }

    if (this.order.status === 'Cancelled')
      steps.push({ status: 'Cancelled', date: this.order.placedDate });

    this.orderSteps = steps;
  }

  animateTimeline() {
    let i = -1;
    const interval = setInterval(() => {
      i++;
      if (i >= this.orderSteps.length) {
        clearInterval(interval);
      } else {
        this.animatedStepIndex = i;
      }
    }, 700);
  }
}
