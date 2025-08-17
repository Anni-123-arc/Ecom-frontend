import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {

  searchTerm: string = '';
  selectedCategory: string = '';
  selectedPrice: string = '';
  selectedSort: string = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<{ category: string; price: string }>();
  @Output() sortChange = new EventEmitter<string>();

  onSearch() {
    this.searchChange.emit(this.searchTerm);
  }

  onFilterChange() {
    this.filterChange.emit({
      category: this.selectedCategory,
      price: this.selectedPrice
    });
  }

  onSortChange() {
    this.sortChange.emit(this.selectedSort);
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedPrice = '';
    this.selectedSort = '';
    this.searchChange.emit(this.searchTerm);
    this.filterChange.emit({ category: '', price: '' });
    this.sortChange.emit(this.selectedSort);
    this.onSearch();
    this.onFilterChange();
    this.onSortChange();
  }

}
