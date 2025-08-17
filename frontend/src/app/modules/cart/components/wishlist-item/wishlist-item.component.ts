import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.css']
})
export class WishlistItemComponent {
  @Input() item: any;
  @Output() remove = new EventEmitter<number>();
  @Output() moveToCart = new EventEmitter<any>();

  onRemove() {
    this.remove.emit(this.item.id);
  }

  onMoveToCart() {
    this.moveToCart.emit(this.item);
  }
}