import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subCategory?: string; 
  description: string;
  price: number;
  image: string;
  reviews: Review[];
  rating?: number; // Added rating property
}
export interface Review {
  user: string;
  comment: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  //private baseUrl = 'http://localhost:5000/api/products';
  //constructor(private http: HttpClient) {}
  
  private products: Product[] = [
    {
      id: 1,
      name: 'Dell XPS 15',
      brand: 'Dell',
      category: 'Laptops & Computers',
      price: 1500,
      description: 'Laptop from Dell with high performance.',
      image: 'assets/Product-Pics/dell_15.jpg',
      rating: 5,
      reviews: [
        { user: 'Alice', rating: 5, comment: 'Best laptop ever!' },
        { user: 'Bob', rating: 4, comment: 'Really good.' }  
      ]
    },
    {
      id: 2,
      name: 'Logitech MX Master 3 Mouse',
      brand: 'Logitech',
      category: 'Laptops & Computers',
      price: 199,
      description: 'Perfect for PCs.',
      image: 'assets/Product-Pics/Logitech-MX.jpg',
      rating: 5,
      reviews: [
        { user: 'John', rating: 3, comment: 'Cable need to be extend.' },
        { user: 'Emma', rating: 5, comment: 'Correctly fitted to my PC.' }
      ]
    },
    {
      id: 3,
      name: 'iPhone 14',
      brand: 'iPhone',
      category: 'Mobiles',
      price: 90500,
      description: 'Perfect Phone of all.',
      image: 'assets/Product-Pics/iphone-14-pro.jpg',
      rating: 4,
      reviews: [
        { user: 'Preety', rating: 5, comment: 'Great Product!' },
        { user: 'Emma', rating: 4, comment: 'Working Perfectly.' }
      ]
    },
    {
      id: 4,
      name: 'Anker Power Bank',
      brand: 'Anker',
      category: 'Mobiles',
      price: 699,
      description: 'Quality power bank with fast charging.',
      image: 'assets/Product-Pics/Powerbank.jpg',
      rating: 5,
      reviews: [
        { user: 'Andy', rating: 5, comment: 'Charge fastly!' },
        { user: 'Sri', rating: 4, comment: 'Really good.' }
      ]
    },
    {
      id: 5,
      name: 'Sony WH-1000XM5',
      brand: 'Sony',
      category: 'Audio Devices',
      price: 200,
      description: 'Best headphones from us.',
      image: 'assets/Product-Pics/Headphones_sony.jpg',
      rating: 5,
      reviews: [
        { user: 'Chinni', rating: 5, comment: 'Good output!' },
        { user: 'Jenny', rating: 4, comment: 'Adjustable and nice.' }
      ]
    },
    {
      id: 6,
      name: 'LG Smart Refrigerator',
      brand: 'LG',
      category: 'Home Appliances',
      price: 60999,
      description: 'Fresh refridgerator ever.',
      image: 'assets/Product-Pics/Frigge_LG.png',
      rating: 5,
      reviews: [
        { user: 'Emily', rating: 5, comment: 'More space to arrage things!' },
        { user: 'Dany', rating: 4, comment: 'Cool quickly.' }
      ]
    },
    {
      id: 7,
      name: 'Sony Bravia 55" 4K',
      brand: 'Sony',
      category: 'Televisions',
      price: 27999,
      description: 'High quality 4K TV with smart features.',
      image: 'assets/Product-Pics/TV_Sony.jpg',
      rating: 4,
      reviews: [
        { user: 'Neela', rating: 5, comment: 'Good display!' },
        { user: 'Vishu', rating: 4, comment: 'Have latest features.' }
      ]
    },
    {
      id: 8,
      name: 'Apple Watch Series 8',
      brand: 'Apple',
      category: 'Smart Devices',
      price: 3500,
      description: 'Perfect for daily wearing.',
      image: 'assets/Product-Pics/Apple-Watch.jpg',
      rating: 5,
      reviews: [
        { user: 'Ravi', rating: 5, comment: 'Great Product!' },
        { user: 'Lalasa', rating: 4, comment: 'Looks stylish.' }
      ]
    },
    {
      id: 9,
      name: 'boAt Airdopes 181 Pro Earbuds',
      brand: 'boAt',
      category: 'Audio Devices',
      price: 1599,
      description: 'Technology & ASAP Charge Bluetooth Earbuds.',
      image: 'assets/Product-Pics/181Earbuds.png',
      rating: 4,
      // Added reviews for the product
      reviews: [
        { user: 'Bhavya', rating: 5, comment: 'Like this, superbbb.' },
        { user: 'Pushpa', rating: 3, comment: 'Noise cancellation is not working.' }
      ]
    },
    {
      id: 10,
      name: 'BOSCH Front Load Washing Machine',
      brand: 'BOSCH',
      category: 'Home Appliances',
      price: 38999,
      description: '9 kg Fully Automatic Front Load Washing Machine ',
      image: 'assets/Product-Pics/washingMachine.jpg',
      rating: 4,
      reviews: [
        { user: 'George', rating: 4, comment: 'Good product!' },
        { user: 'Pradeep', rating: 5, comment: 'Great Wash quality.' }
      ]
    },
    {
      id: 11,
      name: 'RD Mounts TV Wall Stand',
      brand: 'RD Mounts',
      category: 'Televisions',
      price: 1300,
      description: 'RD PLAST 32 - 43 inch Swivel Wall Mount TV Stand.',
      image: 'assets/Product-Pics/wall-mount.jpg',
      rating: 3,
      reviews: [
        { user: 'Sammi', rating: 2, comment: 'Poor Product!' },
        { user: 'Abhi', rating: 4, comment: 'Useful, liked it.' }
      ]
    },
    {
      id: 12,
      name: 'MacBook Air M2',
      brand: 'Apple',
      category: 'Laptops & Computers',
      price: 89999,
      description: 'Perfect Laptop from Apple.',
      image: 'assets/Product-Pics/silver-macbook.jpg',
      rating: 5,
      reviews: [
        { user: 'Ganesh', rating: 5, comment: 'Amazing product!' },
        { user: 'Alex', rating: 4, comment: 'Slightly heavier to carry.' }
      ]
    },
    {
      id: 13,
      name: 'Mechanical Keyboard',
      brand: 'Logitech',
      category: 'Laptops & Computers',
      price: 299,
      description: 'Comfortable Keybooard with mechanical keys.',
      image: 'assets/Product-Pics/keyboard.jpg',
      rating: 4,
      reviews: [
        { user: 'Alice', rating: 4, comment: 'Best Keyboard!' },
        { user: 'Bob', rating: 3, comment: 'Keys are not working sometimes.' }
      ]
    },
    {
      id: 14,
      name: 'Samsung Galaxy S23',
      brand: 'Samsung',
      category: 'Mobiles',
      price: 35000,
      description: 'Perfect for daily users.',
      image: 'assets/Product-Pics/Samsung-S23.png',
      rating: 5,
      reviews: [
        { user: 'Preety', rating: 5, comment: 'Great Product!' },
        { user: 'Emma', rating: 4, comment: 'Good display.' }
      ]
    },
    {
      id: 15,
      name: 'Wireless Charger',
      brand: 'Anker',
      category: 'Mobiles',
      price: 129,
      description: 'Easy to chargable.',
      image: 'assets/Product-Pics/wireless-charger.jpeg',
      rating: 4,
      reviews: [
        { user: 'Jake', rating: 4, comment: 'Working good!' },
        { user: 'Kumar', rating: 3, comment: 'Bad Connector.' }
      ]
    },
    {
      id: 16,
      name: 'Samsung 1.5 Ton AC',
      brand: 'Samsung',
      category: 'Home Appliances',
      price: 75000,
      description: 'Cools your environment.',
      image: 'assets/Product-Pics/AC.jpg',
      rating: 5,
      reviews: [
        { user: 'Tilak', rating: 5, comment: 'Well conditioning the air.' },
        { user: 'Uma', rating: 4, comment: 'Great Product.' }
      ]
    },
    {
      id: 17,
      name: 'Philips Smart Bulb',
      brand: 'Philips',
      category: 'Smart Devices',
      price: 79,
      description: 'Work even powercut.',
      image: 'assets/Product-Pics/bulb.jpg',
      rating: 3,
      reviews: [
        { user: 'Devi', rating: 4, comment: 'Lighting well!' },
        { user: 'Keerthi', rating: 3, comment: 'Blinking sometimes.' }
      ]
    },
    {
      id: 18,
      name: 'Samsung QLED 65" TV',
      brand: 'Samsung',
      category: 'Televisions',
      price: 45999,
      description: 'Display high quality.',
      image: 'assets/Product-Pics/LED.jpg',
      rating: 5,
      reviews: [
        { user: 'Madhavi', rating: 5, comment: 'Good Visiblility screen.' },
        { user: 'Gagan', rating: 4, comment: 'Great Product.' }
      ]
    },
    {
      id: 19,
      name: 'Boat Rockerz 255 Bluetooth Earphones',
      brand: 'Boat',
      category: 'Audio Devices',
      price: 379,
      description: 'Stylish Earphones with good sound quality.',
      image: '../assets/Orders/Product 11.jpg',
      rating: 3,
      reviews: [
        { user: 'Lucky', rating: 4, comment: 'Stylish Earphones!' },
        { user: 'Alia', rating: 3, comment: 'Sound quality not as expected' }
      ]
    },
    {
      id: 20,
      name: 'Canon EOS R50 Mirrorless Camera',
      brand: 'Canon',
      category: 'Smart Devices',
      price: 50250,
      description: 'Capture stunning photos and videos with the Canon EOS R50.',
      image: '../assets/Orders/Product 7.jpg',
      rating: 5,
      reviews: [
        { user: 'Satya', rating: 5, comment: 'Autofocus working well.' },
        { user: 'Laxmi', rating: 4, comment: 'Good Product.' }
      ]
    }
  ];
  
  getProducts(): Observable<Product[]> {
    //return this.http.get<Product[]>(this.baseUrl);
    return of(this.products);  // Use mock array
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    //return this.http.get<Product>(`${this.baseUrl}/${id}`);
    return of(product);  // Use mock array
  }

}
