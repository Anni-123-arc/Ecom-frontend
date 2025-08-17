import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})

export class SideBar {
  
  //@Output() categorySelected = new EventEmitter<string>();

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  activeCategory: string | null = null;
  isSidebarOpen: boolean = false;

  categories = [
    {
      name: 'Mobiles',
      subcategories: ['Mobiles', 'Mobile Accessories']
    },
    {
      name: 'Laptops & Computers',
      subcategories: ['Laptops', 'Computer Accessories']
    },
    {
      name: 'Audio Devices',
      subcategories: ['Headphones', 'Earbuds', 'Speakers']
    },
    {
      name: 'Home Appliances',
      subcategories: ['Air Conditioners', 'Refrigerators', 'Washing Machines']
    },
    {
      name: 'Televisions',
      subcategories: ['TVs', 'TV Accessories']
    },
    {
      name: 'Smart Devices',
      subcategories: ['Smart Watches', 'Smart Lights']
    }
  ];
  
  toggleCategory(categoryName: string): void {
    // If you want the icon click itself to redirect:
    this.activeCategory = this.activeCategory === categoryName ? null : categoryName;
    this.onCategorySelect(categoryName); // triggers navigation
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
    this.activeCategory = null;
    document.body.style.overflow = '';
  }

  onCategorySelect(category: string) {
    this.categoryService.setCategory(category);
    this.closeSidebar();
    this.router.navigate(['/products']); //e-commerce-platform_ttp1dema2512_team-1b\frontend\src\app\modules\products\product-list
    // If already on product-list page, just update products
    if (this.router.url !== '/products') {
      this.router.navigate(['/products']);
    }
  }
  
}
  
