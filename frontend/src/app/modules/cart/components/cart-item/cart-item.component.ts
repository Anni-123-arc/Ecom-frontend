import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item: any;
  @Output() remove = new EventEmitter<number>();
  @Output() updateQuantity = new EventEmitter<{id: number, change: number}>();

  onRemove() {
    this.remove.emit(this.item.id);
  }

  onUpdateQuantity(change: number) {
    this.updateQuantity.emit({id: this.item.id, change});
  }
}