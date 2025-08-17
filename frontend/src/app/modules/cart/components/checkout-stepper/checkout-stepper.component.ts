import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressSelectorComponent } from '../address-selector/address-selector.component';

@Component({
  selector: 'app-checkout-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    AddressSelectorComponent
  ],
  templateUrl: './checkout-stepper.component.html',
  styleUrls: ['./checkout-stepper.component.css']
})
export class CheckoutStepperComponent {
  checkoutForm: FormGroup;
  selectedAddressId?: number;
  orderConfirmed = false;
  processingPayment = false;
  selectedMethod = 'credit_card';

  // Demo test cards
  testCards = [
    { type: 'Visa', number: '4242 4242 4242 4242' },
    { type: 'Mastercard', number: '5555 5555 5555 4444' },
    { type: 'Amex', number: '3782 822463 10005' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.checkoutForm = this.fb.group({
      address: [null, Validators.required],
      payment: this.fb.group({
        method: ['credit_card', Validators.required],
        nameOnCard: ['DEMO USER', [Validators.required]],
        cardNumber: ['4242 4242 4242 4242', [
          Validators.required,
          Validators.pattern(/^[\d\s]{16,19}$/)
        ]],
        expiry: ['12/30', [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
        ]],
        cvv: ['123', [
          Validators.required,
          Validators.pattern(/^\d{3,4}$/)
        ]]
      })
    });
  }

  onAddressSelected(address: any) {
    this.selectedAddressId = address.id;
    this.checkoutForm.get('address')?.setValue(address);
  }

  submitOrder() {
    this.processingPayment = true;
    
    // Simulate payment processing
    setTimeout(() => {
      this.processingPayment = false;
      this.orderConfirmed = true;
      
      setTimeout(() => {
        this.router.navigate(['/home'], {
          state: {
            orderId: 'DEMO-' + Math.floor(100000 + Math.random() * 900000),
            amount: 99.99
          }
        });
      }, 2000);
    }, 3000);
  }

  selectTestCard(card: any) {
    this.checkoutForm.get('payment.cardNumber')?.setValue(card.number);
  }

  get paymentForm() {
    return this.checkoutForm.get('payment') as FormGroup;
  }

  debugForm() {
    console.log('Form validity:', this.paymentForm.valid);
    console.log('Form errors:', this.paymentForm.errors);
    Object.keys(this.paymentForm.controls).forEach(key => {
      console.log(`${key} validity:`, this.paymentForm.get(key)?.valid);
      console.log(`${key} errors:`, this.paymentForm.get(key)?.errors);
    });
  }
}