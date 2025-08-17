import { Injectable } from '@angular/core';
import axios from 'axios'


@Injectable({
  providedIn: 'root'
})
export class OrderManagement {

  orderDetails = {}

  orderList:any[] =[
  {
    "OrderId": "ORD001",
    "CustomerId": "CUST1001",
    "ProductId": "PROD001",
    "DeliveryStatus": "Delivered",
    "TotalAmount": 799
  },
  {
    "OrderId": "ORD002",
    "CustomerId": "CUST1002",
    "ProductId": "PROD002",
    "DeliveryStatus": "Shipped",
    "TotalAmount": 2499
  },
  {
    "OrderId": "ORD003",
    "CustomerId": "CUST1003",
    "ProductId": "PROD003",
    "DeliveryStatus": "Pending",
    "TotalAmount": 499
  },
  {
    "OrderId": "ORD004",
    "CustomerId": "CUST1001",
    "ProductId": "PROD004",
    "DeliveryStatus": "Cancelled",
    "TotalAmount": 1599
  },
  {
    "OrderId": "ORD005",
    "CustomerId": "CUST1004",
    "ProductId": "PROD005",
    "DeliveryStatus": "Delivered",
    "TotalAmount": 3299
  },
  {
    "OrderId": "ORD006",
    "CustomerId": "CUST1005",
    "ProductId": "PROD006",
    "DeliveryStatus": "Shipped",
    "TotalAmount": 18999
  },
  {
    "OrderId": "ORD007",
    "CustomerId": "CUST1006",
    "ProductId": "PROD007",
    "DeliveryStatus": "Delivered",
    "TotalAmount": 999
  },
  {
    "OrderId": "ORD008",
    "CustomerId": "CUST1003",
    "ProductId": "PROD008",
    "DeliveryStatus": "Pending",
    "TotalAmount": 4599
  },
  {
    "OrderId": "ORD009",
    "CustomerId": "CUST1007",
    "ProductId": "PROD009",
    "DeliveryStatus": "Delivered",
    "TotalAmount": 1399
  },
  {
    "OrderId": "ORD010",
    "CustomerId": "CUST1008",
    "ProductId": "PROD010",
    "DeliveryStatus": "Shipped",
    "TotalAmount": 5999
  }
]

  constructor( ) { }


  getOrders(){
    return this.orderList
  }


async getOrderDetails(orderID: string) {
  try {
    const response = await axios.get(`https://ecom-backend-ak0w.onrender.com/api/track/${orderID}`).then(res => res.data);

    // This will store only your res.json object
    console.log('Order details fetched successfully:', response);
    return response;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}


async getOrderHistory(email: string) {

   try {
    const response = await axios.get(`https://ecom-backend-ak0w.onrender.com/api/history/${email}`).then(res => res.data);

    // This will store only your res.json object
    console.log('Order history fetched successfully:', response);
    return response;
  } catch (error) {
    console.error('Error fetching order history:', error);
    return null;
  }

  }
}
