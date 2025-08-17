import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders = [
    {
    id: 'ORD001',
    productName: 'Samsung Galaxy S23 Ultra',
    price: 124999.99,
    status: 'Delivered',
    year: '2025',
    imageUrl: '../assets/Orders/Product 1.jpeg',
    seller: 'Samsung India',
    paymentMode: 'UPI',
    recipientName: 'Rahul Kumar',
    deliveryAddress: '123 MG Road, Hyderabad, Telangana - 500081',
    phone: '9876543210',
    deliveryDate: 'August 3, 2025',
    placedDate: 'Aug 1, 2025',
    deliveredDate: 'Aug 9, 2025'
  },
  {
    id: 'ORD002',
    productName: 'Apple iPhone 15 Pro Max',
    price: 159999.99,
    status: 'Cancelled',
    year: '2025',
    imageUrl: '../assets/Orders/Product 2.jpg',
    seller: 'Apple India',
    paymentMode: 'Credit Card',
    recipientName: 'Sneha Sharma',
    deliveryAddress: '45 Park Street, Kolkata, West Bengal - 700016',
    phone: '9988776655',
    deliveryDate: 'August 7, 2025',
    placedDate: 'Aug 5, 2025',
    cancellationReasons: 'Customer changed mind',
    cancellationImage: 'https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
  },
  {
    id: 'ORD003',
    productName: 'Sony Bravia 55" 4K TV',
    price: 79999.99,
    status: 'Shipped',
    year: '2025',
    imageUrl: '../assets/Orders/Product 3.jpg',
    seller: 'Sony Electronics',
    paymentMode: 'Net Banking',
    recipientName: 'Arjun Verma',
    deliveryAddress: '78 Residency Road, Bengaluru, Karnataka - 560025',
    phone: '9123456780',
    deliveryDate: 'August 15, 2025',
    placedDate: 'Aug 3, 2025',
    deliveredDate: 'Aug 15, 2025',
    returnReasons: 'Screen flickering issue',
    returnImage: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png'
  },
  {
    id: 'ORD004',
    productName: 'JBL Flip 6 Bluetooth Speaker',
    price: 11999.99,
    status: 'Delivered',
    year: '2024',
    imageUrl: '../assets/Orders/Product 4.jpg',
    seller: 'JBL Store',
    paymentMode: 'UPI',
    recipientName: 'Meera Iyer',
    deliveryAddress: '12 Church Street, Chennai, Tamil Nadu - 600001',
    phone: '9876501234',
    deliveryDate: 'August 4, 2024',
    placedDate: 'Aug 2, 2024',
    deliveredDate: 'Aug 8, 2024'
  },
  {
    id: 'ORD005',
    productName: 'OnePlus Buds Pro 2',
    price: 11999.99,
    status: 'Delivered',
    year: '2023',
    imageUrl: '../assets/Orders/Product 5.jpg',
    seller: 'OnePlus Store',
    paymentMode: 'UPI',
    recipientName: 'Vikas Reddy',
    deliveryAddress: '56 Jubilee Hills, Hyderabad, Telangana - 500033',
    phone: '9845123456',
    deliveryDate: 'August 10, 2023',
    placedDate: 'Aug 7, 2023',
    deliveredDate: 'Aug 12, 2023'
  },
  {
    id: 'ORD006',
    productName: 'Logitech Wireless Mouse',
    price: 1499.99,
    status: 'Delivered',
    year: '2023',
    imageUrl: '../assets/Orders/Product 6.jpg',
    seller: 'Logitech India',
    paymentMode: 'Net Banking',
    recipientName: 'Abhishek Raina',
    deliveryAddress: '99 Lake View Road, Bhopal, Madhya Pradesh - 462002',
    phone: '9877001122',
    deliveryDate: 'August 12, 2023',
    placedDate: 'Aug 3, 2023',
    deliveredDate: 'Aug 12, 2023'
  },
  {
    id: 'ORD007',
    productName: 'Canon EOS R50 Mirrorless Camera',
    price: 85999.99,
    status: 'Returned',
    year: '2024',
    imageUrl: '../assets/Orders/Product 7.jpg',
    seller: 'Canon India',
    paymentMode: 'Credit Card',
    recipientName: 'Ankit Singh',
    deliveryAddress: '22 Civil Lines, Lucknow, Uttar Pradesh - 226001',
    phone: '9876123450',
    deliveryDate: 'August 14, 2024',
    placedDate: 'Aug 10, 2024',
    deliveredDate: 'Aug 14, 2024',
    returnReasons: 'Autofocus malfunction',
    returnImage: 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png'
  },
  {
    id: 'ORD008',
    productName: 'Dell XPS 15 Laptop',
    price: 189999.99,
    status: 'Delivered',
    year: '2023',
    imageUrl: '../assets/Orders/Product 8.jpg',
    seller: 'Dell India',
    paymentMode: 'Net Banking',
    recipientName: 'Harshita Nair',
    deliveryAddress: '14 MG Road, Pune, Maharashtra - 411001',
    phone: '9811223344',
    deliveryDate: 'August 18, 2023',
    placedDate: 'Aug 14, 2023',
    deliveredDate: 'Aug 19, 2023'
  },
{
  id: 'ORD009',
  productName: 'SanDisk 64GB USB Pendrive',
  price: 599.99,
  status: 'Cancelled',
  year: '2025',
  imageUrl: '../assets/Orders/Product 9.jpg',
  seller: 'SanDisk India',
  paymentMode: 'UPI',
  recipientName: 'Ravi Teja',
  deliveryAddress: '88 Sector 17, Chandigarh - 160017',
  phone: '9988001122',
  deliveryDate: '',
  placedDate: 'Aug 12, 2025',
  cancellationReasons: 'Delayed delivery',
  cancellationImage: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Cancelled_stamp.png'
},


{
  id: 'ORD010',
  productName: 'iPhone 15 Silicone Case',
  price: 1299.99,
  status: 'Delivered',
  year: '2025',
  imageUrl: '../assets/Orders/Product 10.jpg',
  seller: 'Apple India',
  paymentMode: 'Credit Card',
  recipientName: 'Sunil Chandra',
  deliveryAddress: '66 Connaught Place, New Delhi - 110001',
  phone: '9811998877',
  deliveryDate: 'July 24, 2025',
  placedDate: 'July 20, 2025',
  deliveredDate: 'July 24,2025'
},


{
  id: 'ORD011',
  productName: 'Boat Rockerz 255 Bluetooth Earphones',
  price: 1299.99,
  status: 'Returned',
  year: '2024',
  imageUrl: '../assets/Orders/Product 11.jpg',
  seller: 'Boat Lifestyle',
  paymentMode: 'UPI',
  recipientName: 'Kiran Patil',
  deliveryAddress: '5 Lalbagh Road, Bengaluru, Karnataka - 560027',
  phone: '9845112233',
  deliveryDate: 'August 23, 2024',
  placedDate: 'Aug 21, 2024',
  deliveredDate: 'Aug 23, 2024',
  returnReasons: 'Sound quality not as expected',
  returnImage: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Return_stamp.png'
},


{
  id: 'ORD012',
  productName: 'Mi 18W Fast Charger',
  price: 499.99,
  status: 'Delivered',
  year: '2025',
  imageUrl: '../assets/Orders/Product 12.jpg',
  seller: 'Xiaomi India',
  paymentMode: 'Net Banking',
  recipientName: 'Abhishek Raina',
  deliveryAddress: '99 Lake View Road, Bhopal, Madhya Pradesh - 462002',
  phone: '9877001122',
  deliveryDate: 'August 7, 2025',
  placedDate: 'Aug 3, 2025',
  deliveredDate: 'Aug 7, 2025'
},


{
  id: 'ORD013',
  productName: 'TP-Link 32GB MicroSD Card',
  price: 899.99,
  status: 'Cancelled',
  year: '2024',
  imageUrl: '../assets/Orders/Product 13.jpg',
  seller: 'TP-Link India',
  paymentMode: 'UPI',
  recipientName: 'Divya Kapoor',
  deliveryAddress: '12 Sector 62, Noida, Uttar Pradesh - 201301',
  phone: '9911002233',
  deliveryDate: '',
  placedDate: 'Aug 25, 2024',
  cancellationReasons: 'Incorrect product ordered',
  cancellationImage: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Cancelled_stamp.png'
},


{
  id: 'ORD014',
  productName: 'Sony In-Ear Headphones',
  price: 1999.99,
  status: 'Delivered',
  year: '2023',
  imageUrl: '../assets/Orders/Product 14.jpg',
  paymentMode: 'Credit Card',
  recipientName: 'Nikhil Menon',
  deliveryAddress: '88 Brigade Road, Bengaluru, Karnataka - 560025',
  phone: '9898123456',
  deliveryDate: 'August 30, 2023',
  placedDate: 'Aug 27, 2023',
  deliveredDate: 'Sep 1, 2023'
},


{
  id: 'ORD015',
  productName: 'Generic Mobile Phone Stand',
  price: 399.99,
  status: 'Returned',
  year: '2024',
  imageUrl: '../assets/Orders/Product 15.jpg',
  seller: 'Generic Electronics',
  paymentMode: 'UPI',
  recipientName: 'Shreya Bose',
  deliveryAddress: '77 College Street, Kolkata, West Bengal - 700073',
  phone: '9888111222',
  deliveryDate: 'August 31, 2024',
  placedDate: 'Aug 28, 2024',
  deliveredDate: 'Aug 31, 2024',
  returnReasons: 'Does not fit phone properly',
  returnImage: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Return_stamp.png'
}
  ];

  constructor() {}

  getOrders() {
    return this.orders;
  }

  getOrderById(orderId: string) {
    return this.orders.find(order => order.id === orderId);
  }

  // Updated to handle images for both Cancel and Return
  updateOrderStatus(id: string, status: string, reasons: any) {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.status = status;

      if (status === 'Cancelled') {
        order.cancellationReasons = reasons;
      } 
      else if (status === 'Returned') {
        order.returnReasons = reasons;
      }
    }
  }
}
