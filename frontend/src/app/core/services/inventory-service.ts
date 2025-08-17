import { Injectable, SimpleChanges } from '@angular/core';
import { type PRO } from '../../modules/admin/admin-dashboard/admin-type.model'
import {type Item} from  '../../modules/admin/admin-dashboard/admin-type.model'
import {type UPRO} from '../../modules/admin/admin-dashboard/admin-type.model'
import {type Inventory} from '../../modules/admin/admin-dashboard/admin-type.model'
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  inventory:Inventory[] = [];

  dltInventory = [
    {
      product_id: 'P1001',
      product_name: 'iPhone 14 Pro Max',
      category: 'Electronics',
      price: 1299.99,
      Quantity: 250

    },
    {
      product_id: 'P2001',
      product_name: 'Nike Air Max 270',
      category: 'Fashion',
      price: 149.99,
      Quantity: 69
    }
  ];


  constructor() {
        
   }


   //Method to retrive order details
   test(){
    axios.get('https://ecom-backend-ak0w.onrender.com/api/get-products').then((response)=>{
          const items = response.data.data;
          console.log("Items fetched from backend:", items);
          for(let item of items) {
          this.inventory.push({
            product_id: item.Product_ID ,
            product_name: item.Product_Name,
            category: item.Category,
            price: item.Price,
            Quantity: item.Quantity
          });
        }
          
        })
   }

   // Method to add a new product to the inventory
  addItems(product: any) {

    axios.post('https://ecom-backend-ak0w.onrender.com/api/Uploadproducts', product)


  }

  //Method to get all the products details from db
  getInventoryItems() {

    this.test()

    return this.inventory

  }

  //Method to delete a product from the inventory
  dltItem(product_id: string) {
 
    axios.post(`https://ecom-backend-ak0w.onrender.com/api/delete-product/${product_id}`)
  
    return this.inventory
  }


  //Method to update a product in the inventory
  updateItem(product:UPRO){

    axios.post(`https://ecom-backend-ak0w.onrender.com/api/update-product`, product )


   
  }
}
