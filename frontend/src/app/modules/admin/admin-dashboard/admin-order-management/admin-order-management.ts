import { Component } from '@angular/core';
import { OrderCard } from './order-card/order-card';
import { OrderManagement } from '../../../../core/services/order-management';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-order-management',
  imports: [OrderCard, FormsModule],
  templateUrl: './admin-order-management.html',
  styleUrl: './admin-order-management.css'
})
export class AdminOrderManagement {
  orderList: any[] = []
  selectedFilter: string = ''
  allOrders: any[] = [];
  hideHeading = false;
  private lastScrollTop = 0;

  constructor(private orderManagement: OrderManagement) {
    this.allOrders = this.orderManagement.getOrders();
    this.orderList = [...this.allOrders]; // clone
  }

  filterOrders() {
    if (!this.selectedFilter) {
      this.orderList = [...this.allOrders]; // reset
    } else {
      this.orderList = this.allOrders.filter(
        order => order.DeliveryStatus.toLowerCase() === this.selectedFilter.toLowerCase()
      );
    }
  }

  onScroll(event: Event) {
    const container = event.target as HTMLElement;
    const scrollTop = container.scrollTop;

    this.hideHeading = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
