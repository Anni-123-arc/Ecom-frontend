// address-selector.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-address-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent {
  @Output() addressSelected = new EventEmitter<any>();
  
  addresses = [
    { 
      id: 1, 
      street: '123 Main St', 
      city: 'Nanded',
      state: 'MH',
      zip: '431603',
      country: 'INDIA'
    },
    { 
      id: 2, 
      street: '153c, Cidco', 
      city: 'Nanded',
      state: 'MH',
      zip: '431602',
      country: 'INDIA'
    }
  ];
  
  selectedAddress = 1;
  showAddNewForm = false;

  onAddressChange() {
  const selectedAddressObj = this.addresses.find(addr => addr.id === this.selectedAddress);
  if (selectedAddressObj) {
    this.addressSelected.emit(selectedAddressObj); 
  }
}

  addNewAddress() {
    this.showAddNewForm = true;
  }
}