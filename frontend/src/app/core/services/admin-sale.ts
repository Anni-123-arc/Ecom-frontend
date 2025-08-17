import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminSale {

  dashboardStats = {
    "totalSales": 128900,
    "activeUsers": 2350,
    "ordersPlaced": 589
  }

  dailyStats = [
    { "date": "2025-07-10", "sales": 18200, "users": 320, "orders": 85 },
    { "date": "2025-07-11", "sales": 16400, "users": 300, "orders": 76 },
    { "date": "2025-07-12", "sales": 15200, "users": 280, "orders": 73 },
    { "date": "2025-07-13", "sales": 17300, "users": 310, "orders": 79 },
    { "date": "2025-07-14", "sales": 14800, "users": 290, "orders": 70 },
    { "date": "2025-07-15", "sales": 16500, "users": 330, "orders": 85 },
    { "date": "2025-07-16", "sales": 22500, "users": 520, "orders": 121 }
  ]

  constructor() { }

  getTotalRevenue(){
    return this.dashboardStats.totalSales
  }

  getActiveUsers(){
    return this.dashboardStats.activeUsers
  }
  
  getOrderPlace(){
    return this.dashboardStats.ordersPlaced
  }

}
