import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type PRO } from '../admin-type.model';

@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css'
})
export class AddForm {

  Product_ID: string = '';
  Product_Name: string = '';
  Quantity: number = 0;
  Price: number = 0;
  Category:string = '';
  selectedFile: File | null = null;
  error!: string;

  productToAdd = output<FormData>(); // sending FormData now for file + data
  hideM = output<boolean>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (
      this.Product_ID.trim() === '' ||
      this.Product_Name.trim() === '' ||
      this.Quantity <= 0 ||
      this.Price <= 0 ||
      this.Category === ''||
      !this.selectedFile
    ) {
      this.error = 'All fields are mandatory and image is required';
      return;
    }

    // Use FormData for image upload + other fields
    const formData = new FormData();
    formData.append('Product_ID', this.Product_ID);
    formData.append('Product_Name', this.Product_Name);
    formData.append('Quantity', this.Quantity.toString());
    formData.append('Price', this.Price.toString());
    formData.append('Category' , this.Category);
    formData.append('Image', this.selectedFile);

      console.log('FormData content:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

    this.productToAdd.emit(formData);

    // Reset
    this.Product_ID = '';
    this.Product_Name = '';
    this.Quantity = 0;
    this.Price = 0;
    this.Category = '';
    this.selectedFile = null;

    this.hideModal();
  }

  hideModal() {
    this.hideM.emit(false);
  }
}
