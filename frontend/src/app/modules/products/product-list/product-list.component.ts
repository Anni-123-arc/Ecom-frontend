import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { ProductService, Product } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
//import { HttpClientModule } from '@angular/common/http';
import { HomeHeader } from '../../../shared/components/home-header/home-header';
import { Footer } from '../../../shared/components/footer/footer';
import { ScrollableMenuBar } from '../../../shared/components/scrollable-menu-bar/scrollable-menu-bar';
import { SideBar } from '../../../shared/components/side-bar/side-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent, HomeHeader, Footer, ScrollableMenuBar, SideBar, RouterModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  
  allproducts: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm: string = '';
  filterCategory: string = '';
  sortOption: string = '';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}
  //private productService = inject(ProductService);
  
  ngOnInit(): void {
     this.productService.getProducts().subscribe((data: Product[]) => {
      this.allproducts = data;
      this.filteredProducts = [...this.allproducts]; // Initialize with all products
      });

      this.categoryService.selectedCategory$.subscribe(category => {
      if (category) {
        this.filteredProducts = this.allproducts.filter(
          p => p.category.toLowerCase() === category.toLowerCase()
        );
      } else {
        this.filteredProducts = [...this.allproducts];
      }
    });
  }

  onSearch(term: string) {
    this.filteredProducts = this.allproducts.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.category.toLowerCase().includes(term.toLowerCase())
    );
  }

  // Called when category filter changes
  onFilter(filter: { category: string; price: string }) {
  this.filteredProducts = this.allproducts.filter(p => {
    const matchCategory = filter.category ? p.category === filter.category : true;
    let matchPrice = true;
    if (filter.price === '0-1000') matchPrice = p.price < 1001;
    if (filter.price === '1001-5000') matchPrice = p.price >= 1001 && p.price <= 5000;
    if (filter.price === '5001-50000') matchPrice = p.price > 5000 && p.price <= 50000;
    if (filter.price === '50001') matchPrice = p.price > 50000;
    return matchCategory && matchPrice;
  });
} 
  // Called when sort option changes
  onSort(sortType: string) {
  if (sortType === 'name-asc') {
    this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortType === 'name-desc') {
    this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sortType === 'price-asc') {
    this.filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sortType === 'price-desc') {
    this.filteredProducts.sort((a, b) => b.price - a.price);
  }
}

  // Reset all filters
  onReset() {
    this.searchTerm = '';
    this.filterCategory = '';
    this.sortOption = '';
    this.filteredProducts = [...this.allproducts];
  }

}