import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySource = new BehaviorSubject<string>(''); // default 'all'
  selectedCategory$ = this.selectedCategorySource.asObservable();

  setCategory(category: string) {
    this.selectedCategorySource.next(category);
  }
}
