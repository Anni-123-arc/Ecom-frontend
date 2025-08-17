import { Component , output } from '@angular/core';
import { type UPRO } from '../admin-type.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-form',
  imports: [FormsModule],
  templateUrl: './update-form.html',
  styleUrl: './update-form.css'
})
export class UpdateForm {
  ProductId: string = '';
  Quantity: number = 0;
  Price: number = 0;
  error!: string

  product: UPRO = {
    Product_ID: this.ProductId,
    Quantity: this.Quantity,
    Price: this.Price
  };


  productToUpdate = output<UPRO>() //output signal to emit product data
  hideM = output<boolean>();  // output signal to hide the modal

  onSubmit() {


    if (this.ProductId === '' || this.Quantity <= 0 || this.Price <= 0) {
      this.error = 'all fields are mandatory'
      return
    }

    const product: UPRO = {
      Product_ID: this.ProductId,
      Quantity: this.Quantity,
      Price: this.Price
    };


    this.productToUpdate.emit(product);

    // Optional: Reset fields after submission
    this.ProductId = '';
    this.Quantity = 0;
    this.Price = 0;

    this.hideModal()
  }



  hideModal() {
    this.hideM.emit(false);
  }

}
